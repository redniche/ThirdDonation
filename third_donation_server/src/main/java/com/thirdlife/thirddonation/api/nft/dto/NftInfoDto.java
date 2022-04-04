package com.thirdlife.thirddonation.api.nft.dto;

import com.thirdlife.thirddonation.api.user.dto.UserInfoDto;
import com.thirdlife.thirddonation.db.nft.entity.Nft;
import javax.persistence.Column;
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
    private UserInfoDto artist;
    private UserInfoDto owner;
    private Boolean isMintSold;
    private Integer wishCount;
    private String name;
    private String fileType;

    /**
     * nft 정보를 빌드하는 메서드.
     * tokenUri 에 중복 저장된 정보를 같이 보내준다.
     *
     * @param nft Nft
     * @return NftInfoDto
     */
    public static NftInfoDto of(Nft nft) {
        return NftInfoDto.builder()
                .id(nft.getId())
                .tokenUri(nft.getTokenUri())
                .artist(UserInfoDto.of(nft.getArtist()))
                .owner(UserInfoDto.of(nft.getOwner()))
                .isMintSold(nft.getIsMintSold())
                .wishCount(nft.getWishCount())
                .name(nft.getName())
                .fileType(nft.getFileType())
                .build();
    }
}
