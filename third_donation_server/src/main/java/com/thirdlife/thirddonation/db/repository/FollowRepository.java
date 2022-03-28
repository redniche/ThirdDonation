package com.thirdlife.thirddonation.db.repository;

import com.thirdlife.thirddonation.db.entity.user.Follow;
import com.thirdlife.thirddonation.db.entity.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 팔로우 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface FollowRepository extends JpaRepository<Follow, Long> {
    /**
     * 팔로잉 데이터 조회.
     *
     * @param user User
     * @param followingArtist User
     * @return Optional
     */
    Optional<Follow> findByUserAndFollowingArtist(User user, User followingArtist);
}
