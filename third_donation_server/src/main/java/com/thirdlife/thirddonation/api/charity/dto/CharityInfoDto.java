package com.thirdlife.thirddonation.api.charity.dto;

import com.thirdlife.thirddonation.db.charity.entity.Charity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * CherifyInfoDto 자선단체 정보를 담을 Dto 클래스입니다.
 */
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CharityInfoDto {
    private String name;
    private String walletAddress;
    private String url;
    private Boolean enabled;


    /**
     * 자선단체의 모든 정보를 반환합니다.
     *
     * @param charity Charity 자선단체 객체
     * @return CharityInfoDto 자선단체 정보 Dto
     */
    public static CharityInfoDto of(Charity charity) {
        CharityInfoDto charityInfoDto = new CharityInfoDto();
        charityInfoDto.setName(charity.getName());
        charityInfoDto.setWalletAddress(charity.getId());
        charityInfoDto.setUrl(charity.getUrl());
        charityInfoDto.setWalletAddress(charity.getId());
        charityInfoDto.setEnabled(charity.getEnabled());

        return charityInfoDto;
    }
}
