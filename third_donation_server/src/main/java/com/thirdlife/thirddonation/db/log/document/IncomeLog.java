package com.thirdlife.thirddonation.db.log.document;

import java.time.LocalDateTime;
import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 거래 기록 DTO.
 */
@Builder
@Document(collection = "income_log")
public class IncomeLog {

    Long userId;
    Long tokenId;
    Long income;
    LocalDateTime tradingDate;

}
