package com.thirdlife.thirddonation.api.charity.service;

import com.thirdlife.thirddonation.api.charity.dto.CharityInfoDto;
import com.thirdlife.thirddonation.api.charity.dto.request.CharityRegisterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 자선단체 서비스입니다.
 */
public interface CharityService {
    /**
     * 자선단체를 생성하는 메서드입니다.
     *
     * @param charityRegisterRequest CharityRegisterRequest
     */
    void createCharity(CharityRegisterRequest charityRegisterRequest);

    /**
     * 자선단체를 삭제하는 메서드입니다.
     *
     * @param walletAddress String
     */
    void enableCharity(String walletAddress, Boolean enabled);

    /**
     * 자선 단체 리스트를 반환하는 메서드입니다.
     *
     * @param pageable Pageable
     * @return List of Charity
     */
    Page<CharityInfoDto> getCharityList(Pageable pageable);

    /**
     * 허가된 자선 단체 리스트를 반환하는 메서드입니다.
     *
     * @param pageable Pageable
     * @return List of Charity
     */
    Page<CharityInfoDto> getEnableCharityList(Pageable pageable);
}
