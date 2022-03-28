package com.thirdlife.thirddonation.api.dto.request.charity;

import com.thirdlife.thirddonation.db.entity.nft.Charity;
import javax.validation.constraints.NotBlank;
import lombok.Getter;

/**
 * 자선 단체 등록을 위한 DTO.
 */
@Getter
public class CharityRegisterRequest {

    @NotBlank
    private String walletAddress;

    @NotBlank
    private String name;

    @NotBlank
    private String url;

    /**
     * 요청 값을 기반으로 Charity 엔티티를 반환합니다.
     *
     * @return Charity
     */
    public Charity toEntity() {
        return Charity.builder()
                .id(walletAddress)
                .name(name)
                .url(url)
                .build();
    }
}
