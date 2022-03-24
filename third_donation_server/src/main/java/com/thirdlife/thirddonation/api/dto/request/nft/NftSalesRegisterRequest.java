package com.thirdlife.thirddonation.api.dto.request.nft;

import com.thirdlife.thirddonation.db.entity.nft.SaleType;
import com.thirdlife.thirddonation.db.entity.nft.Sales;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.ToString;

/**
 * NFT 구매 정보 등록 요청 양식.
 */
@ToString
@Getter
public class NftSalesRegisterRequest {

    @NotNull
    private Long tokenId;

    private SaleType saleType;

    @NotNull
    private Long basePrice;

    @NotNull
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
