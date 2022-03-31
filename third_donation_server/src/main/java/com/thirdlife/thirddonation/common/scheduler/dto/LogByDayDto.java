package com.thirdlife.thirddonation.common.scheduler.dto;

import io.swagger.annotations.ApiModel;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * 일자별 Log Dto 저장.
 */
@Data
@ApiModel("거래로그Dto")
public class LogByDayDto {

    @Field("userId")
    private Long userId;

    @Field("tokenIds")
    private List<Long> tokenIds;

    @Field("sumIncome")
    private Long sumIncome;

    @Field("tradingDates")
    private List<LocalDateTime> tradingDates;
}

