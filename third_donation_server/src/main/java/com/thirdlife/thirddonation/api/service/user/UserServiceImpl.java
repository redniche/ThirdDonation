package com.thirdlife.thirddonation.api.service.user;

import com.thirdlife.thirddonation.api.dto.request.user.UserProfileModifyRequest;
import com.thirdlife.thirddonation.api.dto.request.user.UserRequest;
import com.thirdlife.thirddonation.api.exception.CustomException;
import com.thirdlife.thirddonation.api.exception.ErrorCode;
import com.thirdlife.thirddonation.db.entity.user.User;
import com.thirdlife.thirddonation.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * 유저 서비스의 구현체입니다.
 */
@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
     * 유저 프로필을 입력받아 유저 정보를 바꾸는 메서드입니다.
     * 전체를 바꾸는 것이 아닌 존재하는 입력된 값만을 바꿉니다. (Patch)
     *
     * @param user             User
     * @param userModifyReqDto UserProfileModifyRequestDto
     * @return User
     */
    @Override
    public User modifyUserProfile(User user, UserProfileModifyRequest userModifyReqDto) {
        return null;
    }

    /**
     * 유저와 이미지 파일을 입력받아 저장하고 이미지 경로를 반환합니다.
     *
     * @param user      User
     * @param imageFile MultipartFile
     * @return String
     */
    @Override
    public String saveImage(User user, MultipartFile imageFile) {
        return null;
    }
}
