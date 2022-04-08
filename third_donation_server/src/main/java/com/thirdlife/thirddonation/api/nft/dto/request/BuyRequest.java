package com.thirdlife.thirddonation.api.nft.dto.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;

/**
 * 판매 중 NFT 구입 요청.
 */
@Getter
public class BuyRequest {

    @NotNull
    private Long saleId;

    /**
     * 더 이상 구입자 id를 받지 않습니다.
     */
    @Deprecated
    private Long buyerId;

    private String message;

    private String charityWalletAddress;

}
