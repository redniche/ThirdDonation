package com.thirdlife.thirddonation.api.service.charity;

import com.thirdlife.thirddonation.api.dto.request.charity.CharityRegisterRequest;
import com.thirdlife.thirddonation.db.entity.nft.Charity;
import java.util.List;

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
    void deleteCharity(String walletAddress);

    /**
     * 자선 단체 리스트를 반환하는 메서드입니다.
     *
     * @return List
     */
    List<Charity> getCharityList();
}
