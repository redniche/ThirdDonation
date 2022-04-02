package com.thirdlife.thirddonation.api.charity.controller;

import com.thirdlife.thirddonation.api.charity.dto.CharityInfoDto;
import com.thirdlife.thirddonation.api.charity.dto.request.CharityRegisterRequest;
import com.thirdlife.thirddonation.api.charity.dto.response.CharityResponse;
import com.thirdlife.thirddonation.api.charity.service.CharityService;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 자선단체 관련의 요청을 처리하는 컨트롤러입니다.
 */
@Slf4j
@Validated
@Api(tags = "자선단체 관리")
@RestController
@RequestMapping("${request.path.api}${request.path.charities}")
@RequiredArgsConstructor
public class CharityController {

    private final CharityService charityService;

    /**
     * Post 요청시 전송받은 정보로 자선 단체 리스트를 조회합니다.
     *
     * @param charityRegisterRequest CharityRegisterRequest
     * @return ResponseEntity&lt;BaseResponseBody&gt;
     */
    @PostMapping
    @ApiOperation(value = "자선단체 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> createCharity(
            @Valid @RequestBody @ApiParam(value = "자선단체 정보", required = true)
                    CharityRegisterRequest charityRegisterRequest) {

        charityService.createCharity(charityRegisterRequest);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * 자선 단체 리스트를 반환합니다.
     *
     * @return ResponseEntity
     */
    @GetMapping
    @ApiOperation(value = "자선단체 리스트 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<CharityResponse> getCharityList(
            @PageableDefault(sort = "dateCreated", direction = Sort.Direction.DESC)
            @ApiParam(value = "페이지네이션", required = true) final Pageable pageable) {
        Page<CharityInfoDto> charityList = charityService.getCharityList(pageable);

        return ResponseEntity.status(200)
                .body(CharityResponse.builder().statusCode(200).message("Success").data(charityList)
                        .build());
    }

    /**
     * 지갑 주소 받아와서 자선 단체 허가를 토글한다.
     *
     * @param walletAddress String
     * @return ResponseEntity
     */
    @PatchMapping
    @ApiOperation(value = "자선단체 허가 업데이트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> enableCharity(
            @ApiParam @RequestParam(value = "자선 단체 지갑 주소", required = true)
                    String walletAddress,
            @ApiParam @RequestParam(value = "자선 단체 허가 여부", required = true) Boolean enabled) {

        charityService.enableCharity(walletAddress, enabled);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }
}
