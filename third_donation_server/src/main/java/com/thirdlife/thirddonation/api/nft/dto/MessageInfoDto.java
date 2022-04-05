package com.thirdlife.thirddonation.api.nft.dto;

import com.thirdlife.thirddonation.api.user.dto.UserInfoDto;
import com.thirdlife.thirddonation.db.nft.entity.Sales;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 판매 완료된 NFT 메시지 반환.
 */
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(access = AccessLevel.PRIVATE)
public class MessageInfoDto {

    private Long saleId;
    private String tokenName;
    private UserInfoDto buyer;
    private String message;
    private LocalDateTime dateTraded;

    /**
     * 판매 완료된 NFT 빌드 메서드.
     *
     * @param sales Sales
     * @return MessageInfoDto
     */
    public static MessageInfoDto of(Sales sales) {
        return MessageInfoDto.builder()
                .saleId(sales.getId())
                .tokenName(sales.getNft().getName())
                .buyer(UserInfoDto.of(sales.getBuyer()))
                .message(sales.getMessage())
                .dateTraded(sales.getDateLastUpdated())
                .build();
    }
}
