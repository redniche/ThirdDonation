package com.thirdlife.thirddonation.common.scheduler.service;

import com.thirdlife.thirddonation.common.scheduler.dto.LogByDayDto;
import java.util.List;

/**
 * 로깅 서비스의 구현체입니다.
 */
public interface IncomeLogAggregation {
    /**
     * 구현.
     *
     * @param userId Long
     * @return List of LogByDayDto
     */
    List<LogByDayDto> aggregateByDay(Long userId);
}
