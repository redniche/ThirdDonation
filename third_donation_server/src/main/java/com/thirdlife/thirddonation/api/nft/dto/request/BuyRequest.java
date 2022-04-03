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

    @Deprecated
    private Long buyerId;

    private String message;

    private String charityWalletAddress;

}
