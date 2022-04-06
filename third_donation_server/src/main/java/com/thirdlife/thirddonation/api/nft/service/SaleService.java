package com.thirdlife.thirddonation.api.nft.service;

import com.thirdlife.thirddonation.api.nft.dto.MessageInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.SaleInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.request.BuyRequest;
import com.thirdlife.thirddonation.api.nft.dto.request.SellRequest;
import com.thirdlife.thirddonation.db.nft.entity.Sales;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.domain.Specification;

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
     * 판매 토큰 메시지 조회 메서드.
     *
     * @param pageable Pageable
     * @return List of Messages
     */
    Page<MessageInfoDto> getMessageList(Long artistId, Pageable pageable);

    /**
     * 판매 완료된 거래 기록 조회.
     *
     * @param pageable Pageable
     * @return Slice of SaleInfo
     */
    Slice<SaleInfoDto> getHistory(Long tokenId, Pageable pageable);

    /**
     * 판매 리스트 필터링 조회 메서드.
     *
     * @param pageable Pageable
     * @param searchKeywords Specification
     * @return Page of SaleInfoDto
     */
    Page<SaleInfoDto> getSalesListFilter(Pageable pageable, Specification<Sales> searchKeywords);
}
