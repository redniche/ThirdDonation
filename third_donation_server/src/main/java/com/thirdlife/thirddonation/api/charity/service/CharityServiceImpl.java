package com.thirdlife.thirddonation.api.charity.service;

import com.thirdlife.thirddonation.api.charity.dto.request.CharityRegisterRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.charity.entity.Charity;
import com.thirdlife.thirddonation.db.charity.repository.CharityRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 유저 서비스의 구현체입니다.
 */
@Service
@Transactional
@AllArgsConstructor
public class CharityServiceImpl implements CharityService {

    private final CharityRepository charityRepository;

    @Override
    public void createCharity(CharityRegisterRequest charityRegisterRequest) {
        charityRepository.save(charityRegisterRequest.toEntity());
    }

    @Override
    public void deleteCharity(String walletAddress) {
        Charity charity =
                charityRepository.findById(walletAddress).orElseThrow(() -> new CustomException(
                        ErrorCode.CHARITY_NOT_FOUND));
        charityRepository.delete(charity);
    }

    @Override
    public List<Charity> getCharityList() {
        return charityRepository.findAll();
    }
}
