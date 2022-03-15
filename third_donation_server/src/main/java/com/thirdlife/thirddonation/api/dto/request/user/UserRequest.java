package com.thirdlife.thirddonation.api.dto.request.user;

import com.thirdlife.thirddonation.db.entity.user.Authority;
import com.thirdlife.thirddonation.db.entity.user.User;
import com.thirdlife.thirddonation.db.entity.user.UserProfile;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 서비스를 이용하기 위한 서비스 가입 요청 양식입니다.
 */
@Getter
@Setter
@ToString
public class UserRequest {
    @NotBlank
    @ApiModelProperty(name = "유저 지갑 주소", example = "your_wallet_address")
    private String walletAddress;

    @NotBlank
    @ApiModelProperty(name = "유저 해싱된 개인키", example = "your_private_hash")
    private String privateHash;

    /**
     * 요청 값을 기반으로 User Entity 를 반환합니다.
     *
     * @return User
     */
    public User toEntity() {
        UserProfile profile = UserProfile.builder().build();
        User user = User.builder()
                .walletAddress(walletAddress)
                .privateHash(privateHash)
                .username(walletAddress)
                .enabled(true)
                .userProfile(profile)
                .authority(Authority.normal)
                .build();
        profile.setUser(user);
        return user;
    }
}
