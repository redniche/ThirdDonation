package com.thirdlife.thirddonation.api.nft.service;

import com.thirdlife.thirddonation.api.nft.dto.request.SalesRegisterRequest;

/**
 * NFT 판매 서비스.
 */
public interface SaleService {
    /**
     * NFT 판매 정보를 등록하는 메서드입니다.
     *
     * @param nftSalesRegisterRequest NftSalesRegisterRequest
     */
    void createSales(SalesRegisterRequest nftSalesRegisterRequest);

    /**
     * NFT 판매 중지 메서드입니다.
     *
     * @param id Long
     */
    void disableSales(Long id);
}
