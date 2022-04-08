package com.thirdlife.thirddonation.api.nft.dto.request;

import com.thirdlife.thirddonation.db.nft.entity.Nft;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Getter;

/**
 * NFT 정보 등록 요청 양식.
 */
@Getter
public class NftMintRequest {
    //TODO web3j에서 해당 컨트랙의 토큰번호와 Uri가 일치하는지 확인 한 후 등록되게 바꿔야 함.
    // 현재는 악의적인 사용자가 여러 허위 Request를 임의로 보내놓고 자리를 차지하면
    // 정상 유저의 요청이 등록 안되게 됨.
    private Long id;

    @NotBlank
    private String tokenUri;

    /**
     * 더 이상 오너 어드레스를 받지 않습니다.
     */
    @Deprecated
    private String ownerAddress;

    @NotBlank
    @Pattern(regexp = "video|image")
    private String fileType;

    @NotBlank
    @Size(max = 254)
    private String name;

    /**
     * 요청 값을 기반으로 User Entity 를 반환합니다.
     *
     * @return NftArt
     */
    public Nft toEntity() {
        return Nft.builder()
                .id(id)
                .tokenUri(tokenUri)
                .fileType(fileType)
                .name(name)
                .isMintSold(false)
                .wishCount(0)
                .build();
    }
}
