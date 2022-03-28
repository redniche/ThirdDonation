package com.thirdlife.thirddonation.api.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 자선단체 관련의 요청을 처리하는 컨트롤러입니다.
 */
@Slf4j
@Validated
@Api(tags = "자선단체 관리")
@RestController
@RequestMapping("${request.path.api}${request.path.users}")
@RequiredArgsConstructor
public class CharityController {

//    private final UserService userService;
//    private final PasswordEncoder passwordEncoder;
//
//    /**
//     * Post 요청시 전송받은 정보로 user를 찾고 만약 없으면 회원가입을 시도합니다.
//     * 만약 있다면 ResponseEntity&lt;UserRequestDto>&gt; 객체를 반환합니다.
//     *
//     * @param userRequest UserProfileResponseDto
//     * @return ResponseEntity&lt;UserProfileResponse&gt;
//     */
//    @PostMapping
//    @ApiOperation(value = "회원 가입 및 로그인",
//            notes = "<strong>지갑주소와 해싱된개인키</strong>를 통해 회원가입 또는 로그인 한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<UserProfileResponse> login(
//            @Valid @RequestBody @ApiParam(value = "회원 정보를 입력받음", required = true)
//                    UserRequest userRequest) {
//
//        String walletAddress = userRequest.getWalletAddress();
//        String privateHash = userRequest.getPrivateHash();
//
//        User user = userService.getUserByWalletAddress(walletAddress);
//
//        if (user == null) {
//            user = userService.createUser(userRequest);
//
//            return ResponseEntity.status(200).body(UserProfileResponse.of(200, "Success", user));
//        }
//
//        if (passwordEncoder.matches(privateHash, user.getPrivateHash())) {
//            // 유효한 privateHash 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
//            return ResponseEntity.ok(UserProfileResponse.of(200, "Success", user));
//        }
//        throw new CustomException(ErrorCode.USER_NOT_FOUND);
//    }
}
