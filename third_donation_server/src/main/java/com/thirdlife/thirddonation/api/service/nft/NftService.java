package com.thirdlife.thirddonation.api.service.nft;

import com.thirdlife.thirddonation.api.dto.request.nft.NftMintRequest;
import com.thirdlife.thirddonation.db.entity.user.User;

/**
 * NFT 서비스.
 */
public interface NftService {
    /**
     * NFT 정보를 등록하는 메서드입니다.
     *
     * @param nftMintRequest NftMintRequest
     * @param owner User
     */
    void createNft(NftMintRequest nftMintRequest, User owner);

}
