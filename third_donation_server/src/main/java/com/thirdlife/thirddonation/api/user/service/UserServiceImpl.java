package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.user.dto.request.UserImgRequest;
import com.thirdlife.thirddonation.api.user.dto.request.UserRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.log.document.DailyIncome;
import com.thirdlife.thirddonation.db.log.repository.DailyIncomeRepository;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 유저 서비스의 구현체입니다.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;
    private final DailyIncomeRepository dailyIncomeRepository;

    /**
     * 유저를 생성하고 DB에 저장하는 메서드입니다.
     *
     * @param userRequest UserLoginRequestDto
     * @return User
     */
    @Override
    public User createUser(UserRequest userRequest) throws CustomException {
        if (checkDuplicateWalletAddress(userRequest.getWalletAddress())) {
            throw new CustomException(ErrorCode.USER_ID_DUPLICATE);
        }

        User userEntity = userRequest.toEntity();

        System.out.println(userEntity);
        try {
            userRepository.save(userEntity);
        } catch (Exception ex) {
            CustomException ex2 = new CustomException(ErrorCode.DATABASE_SERVER_ERROR);
            throw ex2;
        }

        return userEntity;
    }

    /**
     * 지갑 주소 중복을 체크하는 메서드입니다.
     *
     * @param walletAddress String
     * @return Boolean
     */
    @Override
    public Boolean checkDuplicateWalletAddress(String walletAddress) {
        return userRepository.existsByWalletAddress(walletAddress);
    }

    /**
     * 유저를 지갑 주소로 반환 받는 메서드입니다.
     *
     * @param walletAddress String
     * @return User
     */
    @Override
    @Transactional(readOnly = true)
    public User getUserByWalletAddress(String walletAddress) {
        return userRepository.findByWalletAddress(walletAddress);
    }

    /**
     * 유저의 이미지 정보를 업로드하는 메서드입니다.
     *
     * @param userImgRequest UserImgRequest
     */
    @Override
    public void uploadProfileImage(UserImgRequest userImgRequest) {
        User user = userRepository.findById(userImgRequest.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        user.setImagePath(userImgRequest.getImagePath());

        userRepository.save(user);
    }

    /**
     * id로 찾아 유저를 반환하는 메서드입니다.
     *
     * @param id Long
     * @return User
     */
    @Override
    public User getUserById(Long id) {
        return userRepository.getById(id);
    }

    /**
     * 최근 1주일간 사용자의 수익을 반환하는 메서드.
     *
     * @param userId Long
     * @return List of DailyIncome
     */
    @Override
    public List<DailyIncome> getDailyIncome(Long userId) {
        LocalDate yesterday = LocalDate.now().minusDays(1);

        return dailyIncomeRepository.findByUserIdAndTradingDateBetween(userId,
                yesterday.minusDays(7), yesterday);
    }
}
