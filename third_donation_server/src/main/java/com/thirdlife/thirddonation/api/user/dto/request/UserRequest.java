package com.thirdlife.thirddonation.api.user.dto.request;

import com.thirdlife.thirddonation.db.user.entity.Authority;
import com.thirdlife.thirddonation.db.user.entity.User;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
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
    @ApiModelProperty(name = "사인 정보", example = "0x머시기머시기")
    private String signature;

    /**
     * 요청 값을 기반으로 User Entity 를 반환합니다.
     *
     * @return User
     */
    public User toEntity() {
        return User.builder()
                .walletAddress(walletAddress)
                .username("Unnamed")
                .enabled(true)
                .authority(Authority.NORMAL)
                .dateCreated(LocalDateTime.now())
                .followerCount(0)
                .build();
    }
}
