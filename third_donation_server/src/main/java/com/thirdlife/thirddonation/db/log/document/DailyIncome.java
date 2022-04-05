package com.thirdlife.thirddonation.db.log.document;

import java.time.LocalDate;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 사용자별 하루 수익 데이터.
 */
@Data
@Document(value = "daily_income")
public class DailyIncome {

    Long userId;
    Long income;
    LocalDate tradingDate;

}
