package com.thirdlife.thirddonation.db.user.repository;

import com.thirdlife.thirddonation.db.user.entity.Follow;
import com.thirdlife.thirddonation.db.user.entity.User;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 팔로우 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface FollowRepository extends JpaRepository<Follow, Long> {

    /**
     * 팔로워 목록 데이터 조회.
     * @param artistId Long
     * @param pageable Pageable
     * @return Optional
     */
    Optional<Slice<Follow>> findAllByFollowingArtist_Id(Long artistId, Pageable pageable);

    /**
     * 팔로잉 데이터 조회.
     *
     * @param user User
     * @param followingArtist User
     * @return Optional
     */
    Optional<Follow> findByUserAndFollowingArtist(User user, User followingArtist);

    /**
     * 팔로잉 여부 조회.
     *
     * @param userId Long
     * @param artistId Long
     * @return Boolean
     */
    Boolean existsByUserIdAndFollowingArtistId(Long userId, Long artistId);
}
