package com.thirdlife.thirddonation.db.nft.repository;

import com.thirdlife.thirddonation.db.nft.entity.Sales;
import com.thirdlife.thirddonation.db.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Transactional;

/**
 * 거래소 판매 정보 리포지터리입니다.
 */
@Transactional(readOnly = true)
public interface SalesRepository
        extends JpaRepository<Sales, Long>, JpaSpecificationExecutor<Sales> {
    Page<Sales> findAllBySoldOutAndEnabled(Boolean soldOut, Boolean enabled,
                                           Pageable pageable);

    Slice<Sales> findAllBySoldOut(Boolean soldOut, Pageable pageable);

    Page<Sales> findAllBySellerAndSoldOutAndEnabled(User seller, Boolean soldOut,
                                                    Boolean enabled, Pageable pageable);
}
