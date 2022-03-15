package com.thirdlife.thirddonation.db.repository;

import com.thirdlife.thirddonation.db.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 유저 관리용 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, String> {
    /**
     * 유저 정보를 Wallet Address 로 반환받습니다.
     *
     * @param walletAddress String
     * @return User
     */
    User findByWalletAddress(String walletAddress);

    /**
     * 유저 정보를 Wallet Address 로 반환받습니다.
     *
     * @param walletAddress String
     * @return User
     */
    boolean existsByWalletAddress(String walletAddress);
}
