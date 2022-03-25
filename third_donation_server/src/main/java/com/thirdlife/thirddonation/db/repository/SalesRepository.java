package com.thirdlife.thirddonation.db.repository;

import com.thirdlife.thirddonation.db.entity.nft.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 거래소 판매 정보 리포지터리입니다.
 */
@Transactional(readOnly = true)
public interface SalesRepository extends JpaRepository<Sales, Long> {

}
