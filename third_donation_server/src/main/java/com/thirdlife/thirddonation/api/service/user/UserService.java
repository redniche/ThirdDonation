package com.thirdlife.thirddonation.api.service.user;

import com.thirdlife.thirddonation.api.dto.request.user.UserProfileModifyRequest;
import com.thirdlife.thirddonation.api.dto.request.user.UserRequest;
import com.thirdlife.thirddonation.db.entity.user.User;
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

    /**
     * 유저 프로필을 입력받아 유저 정보를 바꾸는 메서드입니다.
     * 전체를 바꾸는 것이 아닌 일부만을 바꿉니다.
     *
     * @param user             User
     * @param userModifyReqDto UserProfileModifyRequestDto
     * @return User
     */
    User modifyUserProfile(User user, UserProfileModifyRequest userModifyReqDto);

    /**
     * 유저와 이미지 파일을 입력받아 저장하고 이미지 경로를 반환합니다.
     *
     * @param user      User
     * @param imageFile MultipartFile
     * @return String
     */
    String saveImage(User user, MultipartFile imageFile);

}
