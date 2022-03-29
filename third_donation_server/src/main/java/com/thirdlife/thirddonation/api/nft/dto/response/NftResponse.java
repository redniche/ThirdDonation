package com.thirdlife.thirddonation.api.nft.dto.response;

import com.thirdlife.thirddonation.api.nft.dto.NftInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

/**
 * NFT 의 정보를 반환합니다.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@ApiModel("Nft")
public class NftResponse extends BaseResponseBody {
    NftInfoDto data;
}
