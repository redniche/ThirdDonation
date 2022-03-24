package com.thirdlife.thirddonation.api.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * CherifyInfoDto 자선단체 정보를 담을 Dto 클래스입니다.
 */
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CherityInfoDto {
    private String name;
    private String walletAddress;


    /**
     * 자선단체의 모든 정보를 반환합니다.
     *
     * @param cherity Cherity 자선단체 객체
     * @return CherityInfoDto 자선단체 정보 Dto
     */
    public static CherityInfoDto of(Cherity cherity) {
        CherityInfoDto cherifyInfoDto = new CherityInfoDto();
        CherityInfoDto.setName(cherity.getName());
        CherityInfoDto.setWalletAddress(cherity.getWalletAddress());

        return cherifyInfoDto;
    }
}
