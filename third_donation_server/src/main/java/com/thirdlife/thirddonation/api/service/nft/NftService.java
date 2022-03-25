package com.thirdlife.thirddonation.api.service.nft;

import com.thirdlife.thirddonation.api.dto.request.nft.NftMintRequest;
import com.thirdlife.thirddonation.api.dto.request.nft.NftSalesRegisterRequest;

/**
 * NFT 서비스.
 */
public interface NftService {
    /**
     * NFT 정보를 등록하는 메서드입니다.
     *
     * @param nftMintRequest NftMintRequest
     */
    void createNft(NftMintRequest nftMintRequest);

    /**
     * NFT 판매 정보를 등록하는 메서드입니다.
     *
     * @param nftSalesRegisterRequest NftSalesRegisterRequest
     */
    void createSales(NftSalesRegisterRequest nftSalesRegisterRequest);

    /**
     * NFT 판매 중지 메서드입니다.
     *
     * @param id Long
     */
    void disableSales(Long id);
}
