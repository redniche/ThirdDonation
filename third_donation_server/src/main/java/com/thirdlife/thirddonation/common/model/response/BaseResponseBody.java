package com.thirdlife.thirddonation.common.model.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@ApiModel("BaseResponseBody")
public class BaseResponseBody {

    @ApiModelProperty(name = "응답 메시지", example = "정상")
    private String message;

    @ApiModelProperty(name = "응답 코드", example = "200")
    private Integer statusCode;

}

