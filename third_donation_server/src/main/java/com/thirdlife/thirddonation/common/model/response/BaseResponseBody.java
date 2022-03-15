package com.thirdlife.thirddonation.common.model.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ApiModel("BaseResponseBody")
public class BaseResponseBody {

    @ApiModelProperty(name = "응답 메시지", example = "정상")
    private String message = null;

    @ApiModelProperty(name = "응답 코드", example = "200")
    private Integer statusCode = null;

    /**
     * 응답 코드 매개변수로 받는 생성자입니다.
     *
     * @param statusCode Integer
     */
    public BaseResponseBody(Integer statusCode) {
        this.statusCode = statusCode;
    }

    /**
     * 응답 코드와 메시지를 받아 BaseResponseBody 객체를 반환합니다.
     *
     * @param statusCode Integer
     * @param message    String
     * @return BaseResponseBody
     */
    public static BaseResponseBody of(Integer statusCode, String message) {
        BaseResponseBody body = new BaseResponseBody();
        body.message = message;
        body.statusCode = statusCode;
        return body;
    }
}

