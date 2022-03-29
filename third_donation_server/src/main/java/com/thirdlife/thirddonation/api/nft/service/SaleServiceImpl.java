package com.thirdlife.thirddonation.api.nft.service;

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
}
