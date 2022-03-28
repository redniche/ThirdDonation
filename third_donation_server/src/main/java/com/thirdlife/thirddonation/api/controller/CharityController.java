package com.thirdlife.thirddonation.api.controller;

import com.thirdlife.thirddonation.api.dto.request.charity.CharityRegisterRequest;
import com.thirdlife.thirddonation.api.dto.response.CharityResponse;
import com.thirdlife.thirddonation.api.service.charity.CharityService;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.entity.nft.Charity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
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
    public ResponseEntity<CharityResponse> getCharityList() {
        List<Charity> charityList = charityService.getCharityList();

        return ResponseEntity.status(200).body(CharityResponse.of(200, "Success", charityList));
    }

    /**
     * 지갑 주소 받아와서 자선 단체를 삭제한다.
     *
     * @param walletAddress String
     * @return ResponseEntity
     */
    @DeleteMapping("/{walletAddress}")
    @ApiOperation(value = "자선단체 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> deleteCharity(
            @NotBlank @PathVariable @ApiParam(value = "자선 단체 지갑 주소", required = true)
                    String walletAddress) {

        charityService.deleteCharity(walletAddress);

        return ResponseEntity.status(200).body(CharityResponse.of(200, "Success"));
    }
}
