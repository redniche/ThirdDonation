package com.thirdlife.thirddonation.api.nft.service;

import com.thirdlife.thirddonation.api.nft.dto.request.WishRequest;

/**
 * NFT 찜 서비스.
 */
public interface WishService {
    /**
     * NFT 찜 정보를 등록하는 메서드입니다.
     *
     * @param wishRequest WishRequest
     */
    void createWish(WishRequest wishRequest);

    /**
     * NFT 찜 정보를 삭제하는 메서드입니다.
     *
     * @param wishRequest WishRequest
     */
    void deleteWish(WishRequest wishRequest);

}
