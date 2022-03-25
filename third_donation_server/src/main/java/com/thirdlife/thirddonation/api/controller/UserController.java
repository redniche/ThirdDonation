package com.thirdlife.thirddonation.api.controller;

import com.thirdlife.thirddonation.api.dto.UserInfoDto;
import com.thirdlife.thirddonation.api.dto.request.user.UserRequest;
import com.thirdlife.thirddonation.api.dto.response.UserProfileResponse;
import com.thirdlife.thirddonation.api.dto.response.UserResponse;
import com.thirdlife.thirddonation.api.exception.CustomException;
import com.thirdlife.thirddonation.api.exception.ErrorCode;
import com.thirdlife.thirddonation.api.service.user.UserService;
import com.thirdlife.thirddonation.db.entity.user.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 회원 관련의 요청을 처리하는 컨트롤러입니다.
 */
@Slf4j
@Validated
@Api(tags = "회원 관리")
@RestController
@RequestMapping("${request.path.api}${request.path.users}")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Post 요청시 전송받은 정보로 user를 찾고 만약 없으면 회원가입을 시도합니다.
     * 만약 있다면 ResponseEntity&lt;UserResponse>&gt; 객체를 반환합니다.
     *
     * @param userRequest UserRequest
     * @return ResponseEntity&lt;UserResponse&gt;
     */
    @PostMapping
    @ApiOperation(value = "회원 가입 및 로그인",
            notes = "<strong>지갑주소와 해싱된개인키</strong>를 통해 회원가입 또는 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserResponse> login(
            @Valid @RequestBody @ApiParam(value = "회원 정보를 입력받음", required = true)
                    UserRequest userRequest) {

        String walletAddress = userRequest.getWalletAddress();

        User user = userService.getUserByWalletAddress(walletAddress);

        UserResponse response;
        if (user == null) {
            user = userService.createUser(userRequest);
        }
        //TODO JWT 사용
        response = UserResponse.of(200, "Success", user);
        return ResponseEntity.status(200).body(response);
    }

    /**
     * Get 요청시 전송받은 정보로 user를 찾고 없으면 에러를 반환합니다.
     * 만약 있다면 ResponseEntity&lt;UserProfileResponse>&gt; 객체를 반환합니다.
     *
     * @param id Long
     * @return ResponseEntity&lt;UserProfileResponse&gt;
     */
    @GetMapping("/profile/{id}")
    @ApiOperation(value = "회원 프로필 조회",
            notes = "<strong>회원 id</strong>를 통해 회원 프로필을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserProfileResponse> profile(
            @PathVariable @ApiParam(value = "조회할 회원 id를 입력받음", required = true)
                    Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            throw new CustomException(ErrorCode.OWNER_NOT_FOUND);
        }
        UserProfileResponse response = UserProfileResponse.of(200, "Success", user);
        return ResponseEntity.status(200).body(response);
    }
}
