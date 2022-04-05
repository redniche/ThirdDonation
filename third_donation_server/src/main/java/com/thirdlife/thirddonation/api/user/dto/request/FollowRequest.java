package com.thirdlife.thirddonation.api.user.dto.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;

/**
 * 팔로우 요청 DTO.
 */
@Getter
public class FollowRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long artistId;

}
