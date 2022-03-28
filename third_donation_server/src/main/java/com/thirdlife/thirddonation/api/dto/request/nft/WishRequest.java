package com.thirdlife.thirddonation.api.dto.request.nft;

import javax.validation.constraints.NotNull;
import lombok.Getter;

/**
 * 찜 요청 양식.
 */
@Getter
public class WishRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long tokenId;

}
