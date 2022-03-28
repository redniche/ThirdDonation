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

    /**
     * NftListResponseBuilder 를 재정의합니다.
     */
    public abstract static class NftListResponseBuilder
            <C extends NftListResponse, B extends NftListResponseBuilder<C, B>>
            extends BaseResponseBodyBuilder<C, B> {
        /**
         * NftListResponseBuilder 의 data 메서드를 오버로딩합니다.
         *
         * @param nftList List
         * @return NftListResponseBuilder
         */
        public B data(List<Nft> nftList) {
            this.data = new ArrayList<>();
            for (Nft nft : nftList) {
                this.data.add(NftInfoDto.of(nft));
            }
            return self();
        }
    }
}
