package com.thirdlife.thirddonation.api.dto.response;

import com.thirdlife.thirddonation.api.dto.UserInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.entity.user.User;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 개인키 해시를 제외한 유저의 전체 정보를 반환 받습니다.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel("UserProfile")
public class UserProfileResponse extends BaseResponseBody {
    private UserInfoDto userInfoDto;

    /**
     * 상태 코드와 메시지, 유저 객체를 입력받아 UserProfileResponseDto 객체를 반환합니다.
     *
     * @param statusCode Integer
     * @param message    String
     * @param user       User
     * @return UserProfileResponseDto
     */
    public static UserProfileResponse of(Integer statusCode, String message, User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setUserInfoDto(UserInfoDto.of2(user));
        return response;
    }
}
