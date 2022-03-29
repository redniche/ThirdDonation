package com.thirdlife.thirddonation.api.nft.service;

import com.thirdlife.thirddonation.api.nft.dto.NftInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.request.NftMintRequest;
import com.thirdlife.thirddonation.db.nft.entity.Nft;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
     * NFT 리스트 조회 메서드입니다.
     * 유저 id로 해당 유저가 가진 NFT 를 조회합니다.
     *
     * @param userId Long
     * @param pageable Pageable
     * @return List of Nft
     */
    Page<NftInfoDto> getNftListByUserId(Long userId, Pageable pageable);

    /**
     * NFT 리스트 조회 메서드입니다.
     * 아티스트의 유저 id로 해당 유저가 만든 NFT 를 조회합니다.
     *
     * @param artistId Long
     * @param pageable Pageable
     * @return List of Nft
     */
    Page<NftInfoDto> getNftListByArtistId(Long artistId, Pageable pageable);

    /**
     * NFT 정보 조회 메서드입니다.
     * Nft 의 id로 해당 NFT의 정보를 조회합니다.
     *
     * @param tokenId Long
     * @return List of Nft
     */
    Nft getNftInfo(Long tokenId);
}
