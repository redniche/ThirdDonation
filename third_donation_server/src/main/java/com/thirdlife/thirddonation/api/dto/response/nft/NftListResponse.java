package com.thirdlife.thirddonation.api.dto.response.nft;

import com.thirdlife.thirddonation.api.dto.NftInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.entity.nft.Nft;
import io.swagger.annotations.ApiModel;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

/**
 * NFT 의 리스트를 반환합니다.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@ApiModel("NftList")
public class NftListResponse extends BaseResponseBody {
    private List<NftInfoDto> data;
}
