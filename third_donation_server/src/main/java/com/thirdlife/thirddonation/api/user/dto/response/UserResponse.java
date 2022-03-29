package com.thirdlife.thirddonation.api.user.dto.response;

import com.thirdlife.thirddonation.api.user.dto.UserInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.user.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 유저의 일부 정보만 반환 받습니다.
 * description 이 제외되어 있습니다.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel("User")
public class UserResponse extends BaseResponseBody {

    private UserInfoDto data;

    /**
     * 상태 코드와 메시지, 유저 객체를 입력받아 UserResponse 객체를 반환합니다.
     *
     * @param statusCode Integer
     * @param message    String
     * @param user       User
     * @return UserResponse
     */
    public static UserResponse of(Integer statusCode, String message, User user) {
        UserResponse response = new UserResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setData(UserInfoDto.of(user));
        return response;
    }
}
