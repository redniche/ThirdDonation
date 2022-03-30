package com.thirdlife.thirddonation.api.nft.service;

import com.thirdlife.thirddonation.api.nft.dto.SaleInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.request.BuyRequest;
import com.thirdlife.thirddonation.api.nft.dto.request.SellRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * NFT 판매 서비스.
 */
public interface SaleService {
    /**
     * NFT 판매 정보를 등록하는 메서드입니다.
     *
     * @param sellRequest SellRequest
     */
    void sell(SellRequest sellRequest);

    /**
     * NFT 구입 처리 메서드.
     *
     * @param buyRequest BuyRequest
     */
    void buy(BuyRequest buyRequest);

    /**
     * NFT 판매 중지 메서드입니다.
     *
     * @param id Long
     */
    void disableSales(Long id);

    /**
     * 판매 리스트 조회 메서드.
     *
     * @param pageable Pageable
     * @return List of Sales
     */
    Page<SaleInfoDto> getSalesList(Pageable pageable);

    /**
     * 특정 판매자의 판매 리스트 조회 메서드.
     *
     * @param sellerId Long
     * @param pageable Pageable
     * @return List of Sales
     */
    Page<SaleInfoDto> getSalesListBySellerId(Long sellerId, Pageable pageable);
}
