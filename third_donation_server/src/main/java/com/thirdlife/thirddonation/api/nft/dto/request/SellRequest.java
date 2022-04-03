package com.thirdlife.thirddonation.api.nft.dto.request;

import com.thirdlife.thirddonation.db.nft.entity.SaleType;
import com.thirdlife.thirddonation.db.nft.entity.Sales;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.ToString;

/**
 * NFT 판매 정보 등록 요청 양식.
 */
@ToString
@Getter
public class SellRequest {

    @NotNull
    private Long tokenId;

    private SaleType saleType;

    @NotNull
    private Long basePrice;

    @Deprecated
    private Long sellerId;

    @NotBlank
    private String contractAddress;

    /**
     * 요청 값을 기반으로 Sales Entity 를 반환합니다.
     *
     * @return Sales
     */
    public Sales toEntity() {
        return Sales.builder()
                .saleType(saleType)
                .basePrice(basePrice)
                .contractAddress(contractAddress)
                .soldOut(false)
                .enabled(true)
                .build();
    }
}
