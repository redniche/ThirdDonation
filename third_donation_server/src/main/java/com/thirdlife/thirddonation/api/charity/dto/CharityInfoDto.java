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


    /**
     * 자선단체의 모든 정보를 반환합니다.
     *
     * @param charity Cherity 자선단체 객체
     * @return CherityInfoDto 자선단체 정보 Dto
     */
    public static CharityInfoDto of(Charity charity) {
        CharityInfoDto charifyInfoDto = new CharityInfoDto();
        charifyInfoDto.setName(charity.getName());
        //charifyInfoDto.setWalletAddress(charity.getWalletAddress());

        return charifyInfoDto;
    }
}
