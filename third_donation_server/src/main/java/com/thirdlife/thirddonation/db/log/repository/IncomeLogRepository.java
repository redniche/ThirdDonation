package com.thirdlife.thirddonation.db.log.repository;

import com.thirdlife.thirddonation.db.log.document.IncomeLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * MongoDB 에 저장할 거래 로그 저장 리포지토리.
 */
@Repository
public interface IncomeLogRepository extends MongoRepository<IncomeLog, String> {

}
