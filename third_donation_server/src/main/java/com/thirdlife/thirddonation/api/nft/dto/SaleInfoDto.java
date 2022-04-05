package com.thirdlife.thirddonation.api.nft.dto;

import com.thirdlife.thirddonation.api.user.dto.UserInfoDto;
import com.thirdlife.thirddonation.db.nft.entity.SaleType;
import com.thirdlife.thirddonation.db.nft.entity.Sales;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 판매 정보를 반환하는 DTO.
 */
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(access = AccessLevel.PRIVATE)
public class SaleInfoDto {

    private Long id;
    private SaleType saleType;
    private NftInfoDto nft;
    private Long basePrice;
    private UserInfoDto seller;
    private UserInfoDto buyer;

    /**
     * 판매 정보 빌드 메서드.
     *
     * @param sales Sales
     * @return SalesInfoDto
     */
    public static SaleInfoDto of(Sales sales) {
        return SaleInfoDto.builder()
                .id(sales.getId())
                .saleType(sales.getSaleType())
                .nft(NftInfoDto.of(sales.getNft()))
                .basePrice(sales.getBasePrice())
                .seller(UserInfoDto.of(sales.getSeller()))
                .build();
    }

    /**
     * 판매 완료 기록 빌드 메서드.
     *
     * @param sales Sales
     * @return SalesInfoDto
     */
    public static SaleInfoDto of2(Sales sales) {
        return SaleInfoDto.builder()
                .id(sales.getId())
                .saleType(sales.getSaleType())
                .nft(NftInfoDto.of(sales.getNft()))
                .basePrice(sales.getBasePrice())
                .seller(UserInfoDto.of(sales.getSeller()))
                .buyer(UserInfoDto.of(sales.getBuyer()))
                .build();
    }
}
