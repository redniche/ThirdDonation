package com.thirdlife.thirddonation.api.nft.dto.response;

import com.thirdlife.thirddonation.api.nft.dto.SaleInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
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
public class SaleListResponse extends BaseResponseBody {

    private List<SaleInfoDto> data;

}
