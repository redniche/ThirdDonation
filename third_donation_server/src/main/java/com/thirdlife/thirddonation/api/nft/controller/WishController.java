package com.thirdlife.thirddonation.api.nft.controller;

import com.thirdlife.thirddonation.api.nft.dto.request.WishRequest;
import com.thirdlife.thirddonation.api.nft.service.WishService;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * NFT 찜하기 요청을 처리하는 컨트롤러입니다.
 */
@Slf4j
@Validated
@Api(tags = "NFT 찜하기 관리")
@RestController
@RequestMapping("${request.path.api}${request.path.nfts}/wish")
@RequiredArgsConstructor
public class WishController {

    private final WishService wishService;

    /**
     * 찜하기 데이터 등록 요청을 처리합니다.
     *
     * @param wishRequest WishRequest
     * @return ResponseEntity
     */
    @PostMapping
    @ApiOperation(value = "찜하기 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> createWish(
            @Valid @RequestBody @ApiParam(value = "찜하기 등록 데이터", required = true)
                    WishRequest wishRequest) {

        wishService.createWish(wishRequest);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * 찜하기 데이터 해제 요청을 처리합니다.
     *
     * @param tokenId Long
     * @return ResponseEntity
     */
    @DeleteMapping("/{tokenId}")
    @ApiOperation(value = "찜하기 해제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> deleteWish(
            @PathVariable @ApiParam(value = "토큰아이디", required = true) Long tokenId) {

        wishService.deleteWish(tokenId);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }
}
