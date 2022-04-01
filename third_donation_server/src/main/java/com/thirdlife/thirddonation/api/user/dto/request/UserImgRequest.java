package com.thirdlife.thirddonation.api.user.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;

/**
 * 유저 프로필 이미지 업로드를 위한 DTO.
 */
@Getter
public class UserImgRequest {

    @NotNull
    private Long id;

    @NotBlank
    private String imageBase64;
}
