package com.thirdlife.thirddonation.api.service.nft;

import com.thirdlife.thirddonation.api.dto.request.nft.NftMintRequest;
import com.thirdlife.thirddonation.api.dto.request.nft.NftSalesRegisterRequest;
import com.thirdlife.thirddonation.api.exception.CustomException;
import com.thirdlife.thirddonation.api.exception.ErrorCode;
import com.thirdlife.thirddonation.db.entity.nft.Nft;
import com.thirdlife.thirddonation.db.entity.nft.Sales;
import com.thirdlife.thirddonation.db.entity.user.User;
import com.thirdlife.thirddonation.db.repository.NftRepository;
import com.thirdlife.thirddonation.db.repository.SalesRepository;
import com.thirdlife.thirddonation.db.repository.UserRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * NFT 서비스의 구현체입니다.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class NftServiceImpl implements NftService {

    private final NftRepository nftRepository;
    private final SalesRepository salesRepository;
    private final UserRepository userRepository;

    /**
     * NFT를 생성하는 메서드입니다.
     *
     * @param nftMintRequest NftMintRequest
     */
    @Override
    public void createNft(NftMintRequest nftMintRequest) {
        final String ownerAddress = nftMintRequest.getOwnerAddress();
        final User owner = userRepository.findByWalletAddress(ownerAddress);

        if (owner == null) {
            throw new CustomException(ErrorCode.OWNER_NOT_FOUND);
        }

        Nft nft = nftMintRequest.toEntity();
        nft.setUser(owner);

        nftRepository.save(nft);
    }

    /**
     * NFT 판매 정보를 등록하는 메서드입니다.
     *
     * @param nftSalesRegisterRequest NftSalesRegisterRequest
     */
    @Override
    public void createSales(NftSalesRegisterRequest nftSalesRegisterRequest) {
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
