package com.thirdlife.thirddonation.api.controller;

import com.thirdlife.thirddonation.api.dto.NftInfoDto;
import com.thirdlife.thirddonation.api.dto.request.nft.NftMintRequest;
import com.thirdlife.thirddonation.api.dto.request.nft.NftSalesRegisterRequest;
import com.thirdlife.thirddonation.api.dto.response.nft.NftListResponse;
import com.thirdlife.thirddonation.api.dto.response.nft.NftResponse;
import com.thirdlife.thirddonation.api.service.nft.NftService;
import com.thirdlife.thirddonation.api.service.user.UserService;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.entity.nft.Nft;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * NFT 작품 관련 요청을 처리하는 컨트롤러입니다.
 */
@Slf4j
@Validated
@Api(tags = "NFT 관리")
@RestController
@RequestMapping("${request.path.api}${request.path.nfts}")
@RequiredArgsConstructor
public class NftController {

    private final UserService userService;
    private final NftService nftService;

    /**
     * Post 요청시 전송받은 정보로 NFT를 등록합니다.
     * 만약 있다면 ResponseEntity 객체를 반환합니다.
     *
     * @param nftMintRequest NftMintRequest
     * @return ResponseEntity
     */
    @PostMapping("/items")
    @ApiOperation(value = "NFT 정보 등록 (민팅)",
            notes = "<strong>NFT</strong>를 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> mint(
            @Valid @RequestBody @ApiParam(value = "NFT 정보", required = true)
                    NftMintRequest nftMintRequest) {

        nftService.createNft(nftMintRequest);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * Post 요청시 전송받은 정보로 NFT 판매 정보를 등록합니다.
     * 만약 있다면 ResponseEntity 객체를 반환합니다.
     *
     * @param nftSalesRegisterRequest NftSalesRegisterRequest
     * @return ResponseEntity
     */
    @PostMapping("/sales")
    @ApiOperation(value = "NFT 판매 등록",
            notes = "<strong>NFT 판매 정보</strong>를 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> createSales(
            @Valid @RequestBody @ApiParam(value = "NFT 판매 정보", required = true)
                    NftSalesRegisterRequest nftSalesRegisterRequest) {

        nftService.createSales(nftSalesRegisterRequest);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * NFT 판매 중지 정보를 등록합니다.
     *
     * @param salesId Long
     * @return ResponseEntity
     */
    @DeleteMapping("/sales/{salesId}")
    @ApiOperation(value = "NFT 판매 중지",
            notes = "<strong>NFT 판매</strong>를 중지한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> disableSales(
            @PathVariable @ApiParam(value = "판매 아이디", required = true)
                    Long salesId) {

        nftService.disableSales(salesId);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * 유저가 소유한 NFT 리스트를 반환합니다.
     * userId와 pageable 을 입력받아 NFT 리스트 반환
     *
     * @param userId   Long 유저아이디
     * @param pageable Pageable 페이지
     * @return ResponseEntity BaseResponseBody
     */
    @GetMapping("/items/{userId}")
    @ApiOperation(value = "NFT 리스트 조회",
            notes = "<strong>NFT 리스트</strong>를 조회한다.<br>http://{서버 주소}/api/chat/message/1?page=0&size=5&sort=id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NftListResponse> getNftList(
            @Positive @PathVariable @ApiParam(value = "유저아이디", required = true)
                    Long userId,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC)
            @ApiParam(value = "페이지네이션", required = true) final Pageable pageable) {

        //nftPage
        Page<NftInfoDto> nftPage = nftService.getNftListByUserId(userId, pageable);

        //Builder 패턴으로 List<NftInfoDto> 를 담은 NftListResponse 을 담은 ResponseEntity 반환
        NftListResponse response =
                NftListResponse.builder().statusCode(100).message("Success")
                        .data(nftPage.getContent())
                        .build();

        return ResponseEntity.status(200)
                .body(response);
    }

    /**
     * 특정 id의 NFT 상세 정보를 반환합니다.
     * userId와 pageable 을 입력받아 NFT 리스트 반환
     *
     * @param tokenId Long 토큰아이디
     * @return ResponseEntity BaseResponseBody
     */
    @GetMapping("/nft/{tokenId}")
    @ApiOperation(value = "NFT 정보 조회",
            notes = "<strong>NFT 정보</strong>를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NftResponse> getNftInfo(
            @PathVariable @ApiParam(value = "토큰아이디", required = true)
                    Long tokenId) {

        Nft nft = nftService.getNftInfo(tokenId);

        // nft 를 담은 NftResponse 을 담은 ResponseEntity 반환
        return ResponseEntity.status(200)
                .body(NftResponse.builder().statusCode(200).message("Success")
                        .data(NftInfoDto.of(nft))
                        .build());
    }
}
