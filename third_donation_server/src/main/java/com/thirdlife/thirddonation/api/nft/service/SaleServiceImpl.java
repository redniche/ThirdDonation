package com.thirdlife.thirddonation.api.nft.service;

import com.thirdlife.thirddonation.api.nft.dto.SaleInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.request.SalesRegisterRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.nft.entity.Nft;
import com.thirdlife.thirddonation.db.nft.entity.Sales;
import com.thirdlife.thirddonation.db.nft.repository.NftRepository;
import com.thirdlife.thirddonation.db.nft.repository.SalesRepository;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * NFT 판매 서비스.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {

    private final NftRepository nftRepository;
    private final SalesRepository salesRepository;
    private final UserRepository userRepository;

    /**
     * NFT 판매 정보를 등록하는 메서드입니다.
     *
     * @param nftSalesRegisterRequest NftSalesRegisterRequest
     */
    @Override
    public void createSales(SalesRegisterRequest nftSalesRegisterRequest) {
        final Long sellerId = nftSalesRegisterRequest.getSellerId();
        final User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new CustomException(ErrorCode.SELLER_NOT_FOUND));

        final Long tokenId = nftSalesRegisterRequest.getTokenId();
        final Nft nft = nftRepository.findById(tokenId)
                .orElseThrow(() -> new CustomException(ErrorCode.NFT_NOT_FOUND));

        if (!seller.equals(nft.getOwner())) {
            throw new CustomException(ErrorCode.CANNOT_SELL_OTHERS);
        }

        Sales sales = nftSalesRegisterRequest.toEntity();
        sales.setSeller(seller);
        sales.setNft(nft);

        salesRepository.save(sales);
    }

    /**
     * NFT 판매 중지 메서드입니다.
     *
     * @param id Long
     */
    @Override
    public void disableSales(Long id) {
        final Sales sales = salesRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.SALE_NOT_FOUND));

        sales.setEnabled(false);
        salesRepository.save(sales);
    }

    /**
     * 판매 리스트 조회 메서드.
     *
     * @param pageable Pageable
     * @return List of Sales
     */
    @Override
    public Page<SaleInfoDto> getSalesList(Pageable pageable) {
        Page<Sales> page = salesRepository.findAllBySoldOutAndEnabled(false, true, pageable);

        return page.map(SaleInfoDto::of);
    }

    /**
     * 특정 판매자의 판매 리스트 조회 메서드.
     *
     * @param sellerId Long
     * @param pageable Pageable
     * @return List of Sales
     */
    @Override
    public Page<SaleInfoDto> getSalesListBySellerId(Long sellerId, Pageable pageable) {
        final User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new CustomException(ErrorCode.SELLER_NOT_FOUND));

        Page<Sales> page = salesRepository
                .findAllBySellerAndSoldOutAndEnabled(seller, false, true, pageable);

        return page.map(SaleInfoDto::of);
    }
}
