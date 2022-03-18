package com.thirdlife.thirddonation.api.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 에러코드들을 나열한 enum 클래스입니다.
 */
@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    CANNOT_FOLLOW_MYSELF(BAD_REQUEST, "자기 자신은 팔로우 할 수 없습니다"),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    UNAUTHORIZED_MEMBER(UNAUTHORIZED, "현재 내 계정 정보가 존재하지 않습니다"),
    USER_PW_INVALID(UNAUTHORIZED, "사용자의 privateHash 가 일치하지 않습니다."),

    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    USER_NOT_FOUND(NOT_FOUND, "해당 유저의 정보를 찾을 수 없습니다."),
    FRIEND_NOT_FOUND(NOT_FOUND, "해당 유저와 친구가 아닙니다."),
    FRIEND_REQUEST_NOT_FOUND(NOT_FOUND, "친구 요청 정보를 찾을 수 없습니다."),
    MEETING_NOT_FOUND(NOT_FOUND, "해당 방을 찾을수 없습니다"),

    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    USER_ID_DUPLICATE(CONFLICT, "중복된 사용자 Wallet address 입니다."),
    FALLOW_DUPLICATE(CONFLICT, "이미 등록된 팔로워입니다."),

    /* 500 ERROR : 서버에서 예기치 않은 에러 발생 */
    DATABASE_SERVER_ERROR(INTERNAL_SERVER_ERROR, "예기치 않은 오류가 발생했습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
