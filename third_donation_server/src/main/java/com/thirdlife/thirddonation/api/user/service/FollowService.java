package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.user.dto.UserInfoDto;
import com.thirdlife.thirddonation.api.user.dto.request.FollowRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * 예술가 팔로우 서비스.
 */
public interface FollowService {
    /**
     * 예술가 팔로우 요첟.
     *
     * @param followRequest FollowRequest
     */
    void createFollow(FollowRequest followRequest);

    /**
     * 예술가 팔로우 삭제 요청.
     *
     * @param followRequest FollowRequest
     */
    void deleteFollow(FollowRequest followRequest);

    /**
     * 예술가 팔로워 리스트 조회.
     *
     * @param userId Long
     * @param pageable Pageable
     * @return Slice
     */
    Slice<UserInfoDto> getFollowerList(Long userId, Pageable pageable)
}
