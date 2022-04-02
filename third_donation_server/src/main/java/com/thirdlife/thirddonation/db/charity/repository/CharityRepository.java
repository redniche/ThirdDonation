package com.thirdlife.thirddonation.db.charity.repository;

import com.thirdlife.thirddonation.db.charity.entity.Charity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 자선단체 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface CharityRepository extends JpaRepository<Charity, String> {
}
