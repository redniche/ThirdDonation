package com.thirdlife.thirddonation.api.exception;

import java.time.LocalDateTime;
import javax.servlet.http.HttpServletRequest;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;


/**
 * 에러 응답 데이터를 반환하는 DTO.
 */
@Getter
@Builder
public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final String requestUrl;
    private final int status;
    private final String error;
    private final String code;
    private final String message;

    /**
     * 요청 값을 기반으로 ErrorResponse 를 반환합니다.
     *
     * @param request HttpServletRequest
     * @param errorCode ErrorCode
     * @return ResponseEntity
     */
    public static ResponseEntity<ErrorResponse> toResponseEntity(
            HttpServletRequest request, ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .requestUrl(request.getRequestURI())
                        .status(errorCode.getHttpStatus().value())
                        .error(errorCode.getHttpStatus().name())
                        .code(errorCode.name())
                        .message(errorCode.getMessage())
                        .build()
                );
    }
}
