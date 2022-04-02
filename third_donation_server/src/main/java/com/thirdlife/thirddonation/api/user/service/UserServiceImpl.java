package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.user.dto.request.UserProfileModifyRequest;
import com.thirdlife.thirddonation.api.user.dto.request.UserRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.config.WebMvcConfig;
import com.thirdlife.thirddonation.db.log.document.DailyIncome;
import com.thirdlife.thirddonation.db.log.repository.DailyIncomeRepository;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.user.entity.UserImg;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import java.io.File;
import java.io.IOException;
import java.security.SignatureException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.web3j.crypto.Hash;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

/**
 * 유저 서비스의 구현체입니다.
 */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
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

        try {
            userRepository.save(userEntity);
        } catch (Exception ex) {
            throw new CustomException(ErrorCode.DATABASE_SERVER_ERROR);
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
     * 유저의 정보를 업데이트 하는 메서드입니다.
     *
     * @param userProfileModifyRequest UserProfileModifyRequest
     */
    @Override
    public void updateProfile(UserProfileModifyRequest userProfileModifyRequest) {
        User user = userRepository.findById(userProfileModifyRequest.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        user.setUsername(userProfileModifyRequest.getUserName());
        user.setDescription(userProfileModifyRequest.getDescription());

        userRepository.save(user);
    }

    @Override
    public String uploadProfileImage(Long userId, MultipartFile multipartFile) {
        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        // find file upload directory
        File uploadDir = new File(WebMvcConfig.ABSOLUTE_PATH + WebMvcConfig.UPLOAD_PATH);
        if (!uploadDir.exists()) {
            if (!uploadDir.mkdirs()) {
                log.trace("폴더 생성 실패");
                throw new CustomException(ErrorCode.SPRING_SERVER_ERROR);
            }
        }

        String fileName = multipartFile.getOriginalFilename();
        UUID uuid = UUID.randomUUID();
        String extension = FilenameUtils.getExtension(fileName);
        String savingFileName = uuid + "." + extension;
        if (fileName == null || fileName.isEmpty()) {
            throw new CustomException(ErrorCode.CANNOT_EMPTY_IMAGE);
        }
        if (!fileName.matches(".+(\\.(?i)(jpg|png|gif))$")) {
            throw new CustomException(ErrorCode.CANNOT_WRONG_MIME);
        }

        try {
            File destFile = new File(
                    WebMvcConfig.ABSOLUTE_PATH + WebMvcConfig.UPLOAD_PATH
                            + File.separator
                            + savingFileName);
            multipartFile.transferTo(destFile);
        } catch (IOException e) {
            e.printStackTrace();
            throw new CustomException(ErrorCode.SPRING_SERVER_ERROR);
        }

        UserImg img = user.getUserImg();
        if (img != null) {
            String fileUrl = img.getFileUrl();
            File file =
                    new File(WebMvcConfig.ABSOLUTE_PATH + WebMvcConfig.UPLOAD_PATH + File.separator,
                            fileUrl);
            if (file.exists()) {
                if (!file.delete()) {
                    log.trace("파일 삭제 실패");
                    throw new CustomException(ErrorCode.SPRING_SERVER_ERROR);
                }
            }
            img.setFileContentType(multipartFile.getContentType());
            img.setFileName(fileName);
            img.setFileSize(multipartFile.getSize());
            img.setFileUrl(savingFileName);
        } else {
            img = UserImg.builder()
                    .user(user)
                    .fileContentType(multipartFile.getContentType())
                    .fileName(fileName)
                    .fileSize(multipartFile.getSize())
                    .fileUrl(savingFileName)
                    .build();
        }

        user.changeUserImg(img);
        userRepository.save(user);

        return savingFileName;
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

    /**
     * 호율적인 검사.
     *
     * @param address String
     * @param signature String
     * @return Boolean
     * @throws SignatureException 인증오류
     */
    @Override
    public Boolean verifyAddressFromSignature(String address, String signature)
            throws SignatureException {
        byte[] messageHashBytes = Numeric.hexStringToByteArray(
                Hash.sha3(Hex.encodeHexString("hello world".getBytes())));
        byte[] signPrefix = ("\u0019Ethereum Signed Message:\n32").getBytes();
        String r = signature.substring(0, 66);
        String s = signature.substring(66, 130);
        String v = "0x" + signature.substring(130, 132);

        byte[] msgBytes = new byte[(signPrefix.length + messageHashBytes.length)];

        System.arraycopy(signPrefix, 0, msgBytes, 0, signPrefix.length);
        System.arraycopy(messageHashBytes, 0, msgBytes, signPrefix.length, messageHashBytes.length);

        String publicKey = Sign.signedMessageToKey(msgBytes,
                        new Sign.SignatureData(Numeric.hexStringToByteArray(v)[0],
                                Numeric.hexStringToByteArray(r),
                                Numeric.hexStringToByteArray(s)))
                .toString(16);

        val recoveredAddress = "0x" + Keys.getAddress(publicKey);
        return Objects.equals(address, recoveredAddress);
    }
}
