package com.thirdlife.thirddonation.api.nft.service;

import com.thirdlife.thirddonation.api.nft.dto.NftInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.request.NftMintRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.nft.entity.Nft;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.nft.repository.NftRepository;
import com.thirdlife.thirddonation.db.nft.repository.SalesRepository;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        nft.setArtist(owner);

        nftRepository.save(nft);
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
        return page.map(NftInfoDto::of);
    }

    /**
     * NFT 리스트 조회 메서드입니다.
     * 아티스트의 유저 id로 해당 유저가 만든 NFT 를 조회합니다.
     *
     * @param artistId Long
     * @param pageable Pageable
     * @return List of Nft
     */
    @Override
    public Page<NftInfoDto> getNftListByArtistId(Long artistId, Pageable pageable) {
        Page<Nft> page = nftRepository.findAllByArtistId(artistId, pageable)
                .orElseThrow(() -> new CustomException(ErrorCode.NFT_NOT_FOUND));
        return page.map(NftInfoDto::of);
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
