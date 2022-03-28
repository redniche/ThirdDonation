package com.thirdlife.thirddonation.api.dto;


import com.thirdlife.thirddonation.db.entity.nft.Nft;
import com.thirdlife.thirddonation.db.entity.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * NFT 의 정보들을 저장하는 Dto 입니다.
 */

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(access = AccessLevel.PRIVATE)
public class NftInfoDto {
    private Long id;
    private String tokenUri;
    private User artist;
    private User user;
    private boolean isMintSold;

    /**
     * nft를 빌드하는 메서드.
     *
     * @param nft Nft
     * @return NftInfoDto
     */
    public static NftInfoDto of(Nft nft) {
        return NftInfoDto.builder()
                .id(nft.getId())
                .tokenUri(nft.getTokenUri())
                .artist(nft.getArtist())
                .user(nft.getUser())
                .isMintSold(nft.getIsMintSold())
                .build();
    }
}
