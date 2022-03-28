package com.thirdlife.thirddonation.api.service.nft;

import com.thirdlife.thirddonation.api.dto.NftInfoDto;
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
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;

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

    /**
     * NFT 리스트 조회 메서드입니다.
     * 유저 id로 해당 유저가 가진 NFT 를 조회합니다.
     *
     * @param userId   Long
     * @param pageable Pageable
     * @return List of Nft
     */
    @Override
    public Page<NftInfoDto> getNftListByUserId(Long userId, Pageable pageable) {
        Page<Nft> page = nftRepository.findAllByUserId(userId, pageable)
                .orElseThrow(() -> new CustomException(ErrorCode.NFT_NOT_FOUND));
        Page<NftInfoDto> infoPage = page.map(NftInfoDto::of);
        return infoPage;
    }

    /**
     * NFT 정보 조회 메서드입니다.
     * Nft 의 id로 해당 NFT의 정보를 조회합니다.
     *
     * @param tokenId Long
     * @return List of Nft
     */
    @Override
    public Nft getNftInfo(Long tokenId) {
        return nftRepository.findById(tokenId)
                .orElseThrow(() -> new CustomException(ErrorCode.NFT_NOT_FOUND));
    }

}
