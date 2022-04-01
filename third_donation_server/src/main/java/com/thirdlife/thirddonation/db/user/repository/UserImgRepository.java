package com.thirdlife.thirddonation.db.user.repository;

import com.thirdlife.thirddonation.db.user.entity.UserImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 유저 이미지 관리용 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface UserImgRepository extends JpaRepository<UserImg, Long> {
}
