package com.thirdlife.thirddonation.api.service.charity;

import com.thirdlife.thirddonation.api.dto.request.user.UserProfileModifyRequest;
import com.thirdlife.thirddonation.api.dto.request.user.UserRequest;
import com.thirdlife.thirddonation.db.entity.charity.Charity;

/**
 * 자선단체 서비스입니다.
 */
public interface CharityService {
    /**
     * 자선단체를 생성하는 메서드입니다.
     *
     * @param userLoginRequestDto UserLoginRequestDto
     * @return User
     */
    Charity createCharity(CharityRequest userLoginRequestDto);

    /**
     * 유저를 지갑 주소로 반환 받는 메서드입니다.
     *
     * @param Name String
     * @return walletAddress
     */
    Charity getWalletAddressByCharity(String Name);

}
