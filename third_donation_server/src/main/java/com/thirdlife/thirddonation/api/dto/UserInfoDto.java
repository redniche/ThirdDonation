package com.thirdlife.thirddonation.api.dto;

import com.thirdlife.thirddonation.db.entity.user.Authority;
import com.thirdlife.thirddonation.db.entity.user.User;
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
    private String privateHash;
    private LocalDateTime dateCreated;
    private String dateExchanged;
    private boolean enabled;
    private boolean isArtist;
    private String username;
    private String description;
    private String imagePath;
    private Authority authority;

    /**
     * 유저의 모든 정보를 반환합니다.
     *
     * @param user User 유저 객체
     * @return UserInfoDto 유저 정보 Dto
     */
    public static UserInfoDto of(User user) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setId(user.getId());
        userInfoDto.setWalletAddress(user.getWalletAddress());
        userInfoDto.setUsername(user.getUsername());

        return userInfoDto;
    }

    /**
     * 유저의 일부 정보를 반환합니다.
     *
     * @param user User 유저 객체
     * @return UserInfoDto 유저 정보 Dto
     */
    public static UserInfoDto of2(User user) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setId(user.getId());
        userInfoDto.setWalletAddress(user.getWalletAddress());
        userInfoDto.setUsername(user.getUsername());

        return userInfoDto;
    }
}
