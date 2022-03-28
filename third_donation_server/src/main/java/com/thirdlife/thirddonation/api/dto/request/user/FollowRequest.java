package com.thirdlife.thirddonation.api.dto.request.user;

import com.thirdlife.thirddonation.db.entity.user.Follow;
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
