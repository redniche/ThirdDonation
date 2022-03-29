package com.thirdlife.thirddonation.api.user.dto;

import com.thirdlife.thirddonation.db.user.entity.Authority;
import com.thirdlife.thirddonation.db.user.entity.User;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * UserInfoDto 유저 정보를 담을 Dto 클래스입니다.
 */
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserInfoDto {
    private Long id;
    private String walletAddress;
    private LocalDateTime dateCreated;
    private LocalDateTime dateExchanged;
    private boolean enabled;
    private String username;
    private String description;
    private String imagePath;
    private Authority authority;

    /**
     * 유저의 접속시 일부 정보를 반환합니다.
     *
     * @param user User 유저 객체
     * @return UserInfoDto 유저 정보 Dto
     */
    public static UserInfoDto of(User user) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setId(user.getId());
        userInfoDto.setWalletAddress(user.getWalletAddress());
        userInfoDto.setUsername(user.getUsername());
        userInfoDto.setImagePath(user.getImagePath());
        userInfoDto.setDateCreated(user.getDateCreated());
        userInfoDto.setDateExchanged(user.getDateExchanged());
        userInfoDto.setEnabled(user.isEnabled());
        userInfoDto.setAuthority(user.getAuthority());

        return userInfoDto;
    }

    /**
     * 유저의 프로필 정보를 반환합니다.
     *
     * @param user User 유저 객체
     * @return UserInfoDto 유저 정보 Dto
     */
    public static UserInfoDto of2(User user) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setId(user.getId());
        userInfoDto.setWalletAddress(user.getWalletAddress());
        userInfoDto.setUsername(user.getUsername());
        userInfoDto.setDescription(user.getDescription());
        userInfoDto.setImagePath(user.getImagePath());
        userInfoDto.setDateCreated(user.getDateCreated());
        userInfoDto.setDateExchanged(user.getDateExchanged());
        userInfoDto.setEnabled(user.isEnabled());
        userInfoDto.setAuthority(user.getAuthority());

        return userInfoDto;
    }
}
