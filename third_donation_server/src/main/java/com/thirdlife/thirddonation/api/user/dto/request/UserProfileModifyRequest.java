package com.thirdlife.thirddonation.api.user.dto.request;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

/**
 * 유저 프로필 정보를 바꾸기 위한 Dto.
 */
@Getter
public class UserProfileModifyRequest {

    @NotBlank
    @ApiModelProperty(name = "닉네임", example = "닉네임을 입력하세요.")
    private String userName;

    @ApiModelProperty(name = "Multipart 이미지 파일", example = "이미지 파일을 업로드합니다.")
    private MultipartFile imageFile;

    @ApiModelProperty(name = "자기 소개", example = "자신에 대해 나타내주세요.")
    private String description;

}
