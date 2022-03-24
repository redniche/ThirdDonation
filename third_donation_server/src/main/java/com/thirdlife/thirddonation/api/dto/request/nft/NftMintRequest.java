package com.thirdlife.thirddonation.api.dto.request.nft;

import com.thirdlife.thirddonation.db.entity.nft.Nft;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;

/**
 * NFT 정보 등록 요청 양식.
 */
@Getter
public class NftMintRequest {

    @NotNull
    private Long id;

    @NotBlank
    private String tokenUri;

    @NotBlank
    private String ownerAddress;

    /**
     * 요청 값을 기반으로 User Entity 를 반환합니다.
     *
     * @return NftArt
     */
    public Nft toEntity() {
        return Nft.builder()
                .id(id)
                .tokenUri(tokenUri)
                .isMintSold(false)
                .build();
    }
}
