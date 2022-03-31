package com.thirdlife.thirddonation.common.scheduler;

import com.thirdlife.thirddonation.common.scheduler.service.IncomeLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 스케줄러.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class Scheduler {

    private final IncomeLogService incomeLogAggregation;

    /**
     * 개인별 수익을 집계하는 스케줄러.
     */
    @Scheduled(cron  = "0 0 0 * * ?")
    private void aggregateIncomeScheduler() {
        log.info("daily aggregate income scheduler is working...!!!");
        incomeLogAggregation.aggregateByDay();
    }
}
