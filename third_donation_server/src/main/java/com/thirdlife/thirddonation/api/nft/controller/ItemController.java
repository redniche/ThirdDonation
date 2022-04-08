package com.thirdlife.thirddonation.api.nft.controller;

import com.thirdlife.thirddonation.api.nft.dto.NftInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.request.NftMintRequest;
import com.thirdlife.thirddonation.api.nft.dto.response.NftListResponse;
import com.thirdlife.thirddonation.api.nft.dto.response.NftResponse;
import com.thirdlife.thirddonation.api.nft.service.NftService;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.common.model.response.MessageBody;
import com.thirdlife.thirddonation.db.nft.entity.Nft;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * NFT 작품 정보 요청을 처리하는 컨트롤러입니다.
 */
@Slf4j
@Validated
@Api(tags = "NFT 작품 정보 관리")
@RestController
@RequestMapping("${request.path.api}${request.path.nfts}/items")
@RequiredArgsConstructor
public class ItemController {

    private final NftService nftService;

    /**
     * Post 요청시 전송받은 정보로 NFT를 등록합니다.
     * 만약 있다면 ResponseEntity 객체를 반환합니다.
     *
     * @param nftMintRequest NftMintRequest
     * @return ResponseEntity
     */
    @PostMapping
    @ApiOperation(value = "NFT 정보 등록 (민팅)", notes = "<strong>NFT</strong>를 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> mint(
            @Valid @RequestBody @ApiParam(value = "NFT 정보", required = true)
                    NftMintRequest nftMintRequest) {

        nftService.createNft(nftMintRequest);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message(MessageBody.SUCCESS)
                        .build());
    }

    /**
     * 유저가 소유한 NFT 리스트를 반환합니다.
     * userId와 pageable 을 입력받아 NFT 리스트 반환
     * isArtist 가 true 이면 해당 아티스트가 제작한 nft 를 조회합니다.
     *
     * @param userId   Long 유저아이디
     * @param pageable Pageable 페이지
     * @param artist   boolean
     * @return ResponseEntity BaseResponseBody
     */
    @GetMapping("/{userId}")
    @ApiOperation(value = "NFT 리스트 조회",
            notes = "<strong>userId로 NFT 리스트</strong>를 조회한다. 아티스트 기준이면 artist=true 를 넣어준다."
                    + "<br>/api/nfts/items/1?page=0&size=5&sort=id?artist=false")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NftListResponse> getNftList(
            @Positive @PathVariable @ApiParam(value = "유저아이디", required = true) Long userId,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC)
            @ApiParam(value = "페이지네이션", required = true) final Pageable pageable,
            @ApiParam(value = "아티스트조회여부", defaultValue = "false") final boolean artist) {

        Page<NftInfoDto> nftPage = artist ? nftService.getNftListByArtistId(userId, pageable) :
                nftService.getNftListByOwnerId(userId, pageable);

        NftListResponse response =
                NftListResponse.builder().statusCode(200).message(MessageBody.SUCCESS)
                        .data(nftPage.getContent()).build();

        return ResponseEntity.status(200).body(response);
    }

    /**
     * 특정 id의 NFT 상세 정보를 반환합니다.
     * userId와 pageable 을 입력받아 NFT 리스트 반환
     *
     * @param tokenId Long 토큰아이디
     * @return ResponseEntity BaseResponseBody
     */
    @GetMapping("/info/{tokenId}")
    @ApiOperation(value = "NFT 정보 조회", notes = "<strong>NFT 정보</strong>를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NftResponse> getNftInfo(
            @PathVariable @ApiParam(value = "토큰아이디", required = true) Long tokenId) {

        Nft nft = nftService.getNftInfo(tokenId);

        // nft 를 담은 NftResponse 을 담은 ResponseEntity 반환
        return ResponseEntity.status(200)
                .body(NftResponse.builder().statusCode(200).message(MessageBody.SUCCESS)
                        .data(NftInfoDto.of(nft)).build());
    }
}
