package com.thirdlife.thirddonation.api.nft.dto.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;

/**
 * 찜 요청 양식.
 */
@Getter
public class WishRequest {

    @Deprecated
    private Long userId;

    @NotNull
    private Long tokenId;

}
