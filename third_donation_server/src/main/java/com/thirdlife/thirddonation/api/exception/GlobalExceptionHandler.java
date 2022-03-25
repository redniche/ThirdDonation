package com.thirdlife.thirddonation.api.exception;

import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Exception 처리 핸들러.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * CustomException 처리.
     *
     * @param ex CustomExcpetion
     * @param request HttpServletRequest
     *
     * @return ResponseEntity
     */
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(
            CustomException ex, HttpServletRequest request) {
        log.error("handleCustomException throws CustomException : {}", ex.getErrorCode());
        return ErrorResponse.toResponseEntity(request, ex.getErrorCode());
    }
}