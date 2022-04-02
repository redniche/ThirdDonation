package com.thirdlife.thirddonation.api.charity.service;

import com.thirdlife.thirddonation.api.charity.dto.CharityInfoDto;
import com.thirdlife.thirddonation.api.charity.dto.request.CharityRegisterRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.charity.entity.Charity;
import com.thirdlife.thirddonation.db.charity.repository.CharityRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public void enableCharity(String walletAddress, Boolean enabled) {
        Charity charity =
                charityRepository.findById(walletAddress).orElseThrow(() -> new CustomException(
                        ErrorCode.CHARITY_NOT_FOUND));
        charity.setEnabled(enabled);
        charityRepository.save(charity);
    }

    @Override
    public Page<CharityInfoDto> getCharityList(Pageable pageable) {
        return charityRepository.findAll(pageable).map(CharityInfoDto::of);
    }
}
