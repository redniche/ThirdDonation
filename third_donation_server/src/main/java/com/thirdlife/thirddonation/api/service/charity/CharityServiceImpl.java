package com.thirdlife.thirddonation.api.service.charity;

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

//    private final UserRepository userRepository;
//
//    /**
//     * 자선단체를 생성하고 DB에 저장하는 메서드입니다.
//     *
//     * @param userRequest UserLoginRequestDto
//     * @return Charity
//     */
//    @Override
//    public Charity createCharity(UserRequest userRequest) throws CustomException {
//        if (checkDuplicateWalletAddress(userRequest.getWalletAddress())) {
//            throw new CustomException(ErrorCode.USER_ID_DUPLICATE);
//        }
//
//        User userEntity = userRequest.toEntity();
//
//        System.out.println(userEntity);
//        userEntity.setPrivateHash(passwordEncoder.encode(userRequest.getPrivateHash()));
//        try {
//            userRepository.save(userEntity);
//        } catch (Exception ex) {
//            CustomException ex2 = new CustomException(ErrorCode.DATABASE_SERVER_ERROR);
//            throw ex2;
//        }
//
//        return userEntity;
//    }
//
//    /**
//     * 유저를 지갑 주소로 반환 받는 메서드입니다.
//     *
//     * @param Name String
//     * @return walletAddress
//     */
//    @Override
//    @Transactional(readOnly = true)
//    public Charity getWalletAddressByCharity(String Name) {
//        return userRepository.findByWalletAddress(walletAddress);
//    }

}
