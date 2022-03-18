package com.thirdlife.thirddonation.api.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 사용자지정 예외 클래스입니다.
 */
@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
    private final ErrorCode errorCode;
}
