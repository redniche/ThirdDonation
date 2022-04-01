package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.user.dto.request.UserImgRequest;
import com.thirdlife.thirddonation.api.user.dto.request.UserProfileModifyRequest;
import com.thirdlife.thirddonation.api.user.dto.request.UserRequest;
import com.thirdlife.thirddonation.db.log.document.DailyIncome;
import com.thirdlife.thirddonation.db.user.entity.User;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

/**
 * 유저 서비스입니다.
 */
public interface UserService {
    /**
     * 유저를 생성하는 메서드입니다.
     *
     * @param userLoginRequestDto UserLoginRequestDto
     * @return User
     */
    User createUser(UserRequest userLoginRequestDto);

    /**
     * 지갑 주소 중복을 체크하는 메서드입니다.
     *
     * @param walletAddress String
     * @return Boolean
     */
    Boolean checkDuplicateWalletAddress(String walletAddress);

    /**
     * 유저를 지갑 주소로 반환 받는 메서드입니다.
     *
     * @param walletAddress String
     * @return User
     */
    User getUserByWalletAddress(String walletAddress);


    void updateProfile(UserProfileModifyRequest userProfileModifyRequest);

    /**
     * 유저의 이미지 정보를 업로드하는 메서드입니다.
     *
      * @param userId Long
     * @param multipartFile MultipartFile
     * @return String
     */
    String uploadProfileImage(Long userId, MultipartFile multipartFile);

    /**
     * id로 찾아 유저를 반환하는 메서드입니다.
     *
     * @param id Long
     * @return User
     */
    User getUserById(Long id);

    /**
     * 최근 1주일간 사용자의 수익을 반환하는 메서드.
     *
     * @param userId Long
     * @return List of DailyIncome
     */
    List<DailyIncome> getDailyIncome(Long userId);
}
