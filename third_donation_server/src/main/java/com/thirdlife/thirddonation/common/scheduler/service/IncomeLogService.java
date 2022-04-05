package com.thirdlife.thirddonation.common.scheduler.service;

import com.thirdlife.thirddonation.db.log.document.DailyIncome;
import java.util.List;

/**
 * 로깅 서비스의 구현체입니다.
 */
public interface IncomeLogService {

    /**
     * 집계함수로 일별 사용자 수익을 로깅합니다.
     *
     * @return List of LogByDayDto
     */
    List<DailyIncome> aggregateByDay();
}
