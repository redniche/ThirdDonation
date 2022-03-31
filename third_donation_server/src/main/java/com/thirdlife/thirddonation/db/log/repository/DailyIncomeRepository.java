package com.thirdlife.thirddonation.db.log.repository;

import com.thirdlife.thirddonation.db.log.document.DailyIncome;
import com.thirdlife.thirddonation.db.log.document.IncomeLog;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * MongoDB 에 저장할 거래 로그 저장 리포지토리.
 */
@Repository
public interface DailyIncomeRepository extends MongoRepository<DailyIncome, String> {

    @Query("{'userId': ?0, 'tradingDate' : { $gte: ?1, $lte: ?2 } }")
    List<DailyIncome> findByUserIdAndTradingDateBetween(Long userId, LocalDate from, LocalDate to);

}
