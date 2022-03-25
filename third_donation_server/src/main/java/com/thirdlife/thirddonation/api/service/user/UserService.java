package com.thirdlife.thirddonation.api.service.user;

import com.thirdlife.thirddonation.api.dto.request.user.UserImgRequest;
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
     * 유저의 이미지 정보를 업로드하는 메서드입니다.
     *
     * @param userImgRequest UserImgRequest
     */
    void uploadProfileImage(UserImgRequest userImgRequest);

    /**
     * id로 찾아 유저를 반환하는 메서드입니다.
     *
     * @param id Long
     * @return User
     */
    User getUserById(Long id);
}
