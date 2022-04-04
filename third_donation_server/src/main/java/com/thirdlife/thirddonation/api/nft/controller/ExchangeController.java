package com.thirdlife.thirddonation.api.nft.controller;

import com.thirdlife.thirddonation.api.nft.SaleSearch;
import com.thirdlife.thirddonation.api.nft.SaleSearch.SearchKey;
import com.thirdlife.thirddonation.api.nft.dto.MessageInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.SaleInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.request.BuyRequest;
import com.thirdlife.thirddonation.api.nft.dto.request.SellRequest;
import com.thirdlife.thirddonation.api.nft.dto.response.SaleListResponse;
import com.thirdlife.thirddonation.api.nft.dto.response.SalesMessageResponse;
import com.thirdlife.thirddonation.api.nft.service.SaleService;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.HashMap;
import java.util.Map;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * NFT 판매 관련 요청을 처리하는 컨트롤러입니다.
 */
@Slf4j
@Validated
@Api(tags = "NFT 판매 관리")
@RestController
@RequestMapping("${request.path.api}${request.path.nfts}${request.path.exchange}")
@RequiredArgsConstructor
public class ExchangeController {

    private final SaleService saleService;

    /**
     * Post 요청시 전송받은 정보로 NFT 판매 정보를 등록합니다.
     * 만약 있다면 ResponseEntity 객체를 반환합니다.
     *
     * @param sellRequest SellRequest
     * @return ResponseEntity
     */
    @PostMapping("/sell")
    @ApiOperation(value = "NFT 판매 등록",
            notes = "<strong>NFT 판매 정보</strong>를 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> sell(
            @Valid @RequestBody @ApiParam(value = "NFT 판매 정보", required = true)
                    SellRequest sellRequest) {

        saleService.sell(sellRequest);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * NFT 구입 정보 등록합니다.
     *
     * @param buyRequest BuyRequest
     * @return ResponseEntity
     */
    @PostMapping("/buy")
    @ApiOperation(value = "NFT 구입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> buy(
            @Valid @RequestBody @ApiParam(value = "NFT 구입 정보", required = true)
                    BuyRequest buyRequest) {

        saleService.buy(buyRequest);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * 판매중인 NFT 리스트 필터링식 조회합니다.
     *
     * @param pageable Pageable
     * @return ResponseEntity
     */
    @GetMapping("/sales")
    @ApiOperation(
            value = "NFT 판매 리스트 필터링 조회",
            notes = "판매자 조회시 sellerId 붙여줌니다. <br>/api/nfts/sales?page=0&size=5&seller_id=9"
                    + "<br> Swagger 에선 지원 안하므로 PostMan 을 사용하세요. 파라미터명은 대소문자를 구분하지 않습니다"
                    + "<br><strong>사용 가능 필터링 목록</strong> "
                    + "<br>artist=아티스트명 일부나 전체"
                    + "<br>name=NFT 이름 "
                    + "<br>file_type=video나 image"
                    + "<br>wish_count_greater=숫자, "
                    + "<br>price_between=작은숫자,큰숫자"
                    + "<br>seller_id=판매자아이디")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<SaleListResponse> getSalesList(
            @ApiParam(value = "조회 필터") @RequestParam(required = false)
                    Map<String, Object> searchRequest,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC)
            @ApiParam(value = "페이지네이션", required = true) final Pageable pageable) {
        Map<SearchKey, Object> searchKeys = new HashMap<>();
        for (String key : searchRequest.keySet()) {
            try {
                searchKeys.put(SearchKey.valueOf(key.toUpperCase()), searchRequest.get(key));
            } catch (Exception ex) {
                //TODO 나중에 guava 등의 방법으로 exception 을 쓰지 않는 방향으로 바꿔야 더 빨라짐.
            }
        }

        Page<SaleInfoDto> salesList = searchKeys.isEmpty() ? saleService.getSalesList(pageable) :
                saleService.getSalesListFilter(pageable, SaleSearch.searchWith(searchKeys));

        return ResponseEntity.status(200).body(
                SaleListResponse.builder()
                        .statusCode(200).message("Success").data(salesList.getContent()).build()
        );
    }

    /**
     * 판메 완료된 NFT 메시지 리스트.
     *
     * @param pageable Pageable
     * @return ResponseEntity
     */
    @GetMapping("/sales/messages")
    @ApiOperation(value = "판메 완료된 NFT 메시지 리스트",
            notes = "?page=0&size=x")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<SalesMessageResponse> getMessageList(
            @PageableDefault(sort = "dateLastUpdated", direction = Sort.Direction.DESC)
            @ApiParam(value = "pageable", required = true) final Pageable pageable
    ) {
        Page<MessageInfoDto> messageList = saleService.getMessageList(pageable);

        return ResponseEntity.status(200)
                .body(SalesMessageResponse.builder().statusCode(200).message("Success")
                        .data(messageList)
                        .build());
    }

    /**
     * NFT 판매 중지 정보를 등록합니다.
     *
     * @param salesId Long
     * @return ResponseEntity
     */
    @PatchMapping("/sales/{salesId}/cancel")
    @ApiOperation(value = "NFT 판매 중지",
            notes = "<strong>NFT 판매</strong>를 중지한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> disableSales(
            @PathVariable @ApiParam(value = "판매 아이디", required = true)
                    Long salesId) {

        saleService.disableSales(salesId);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }
}
