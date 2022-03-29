package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.user.dto.request.FollowRequest;

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
}
