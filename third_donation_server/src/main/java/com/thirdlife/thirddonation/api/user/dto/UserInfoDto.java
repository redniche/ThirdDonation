package com.thirdlife.thirddonation.api.user.dto;

import com.thirdlife.thirddonation.api.nft.dto.NftInfoDto;
import com.thirdlife.thirddonation.db.user.entity.Authority;
import com.thirdlife.thirddonation.db.user.entity.User;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * UserInfoDto 유저 정보를 담을 Dto 클래스입니다.
 */
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
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
        return UserInfoDto.builder()
                .id(user.getId())
                .walletAddress(user.getWalletAddress())
                .dateCreated(user.getDateCreated())
                .dateExchanged(user.getDateExchanged())
                .enabled(user.getEnabled())
                .username(user.getUsername())
                .imagePath(user.getImagePath())
                .authority(user.getAuthority())
                .build();
    }

    /**
     * 유저의 프로필 정보를 반환합니다.
     * description이 포함되어 있습니다.
     *
     * @param user User 유저 객체
     * @return UserInfoDto 유저 정보 Dto
     */
    public static UserInfoDto of2(User user) {
        return UserInfoDto.builder()
                .id(user.getId())
                .walletAddress(user.getWalletAddress())
                .dateCreated(user.getDateCreated())
                .dateExchanged(user.getDateExchanged())
                .enabled(user.getEnabled())
                .username(user.getUsername())
                .imagePath(user.getImagePath())
                .description(user.getDescription())
                .authority(user.getAuthority())
                .build();
    }
}
