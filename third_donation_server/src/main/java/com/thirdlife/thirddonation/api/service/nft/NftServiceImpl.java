package com.thirdlife.thirddonation.api.service.nft;

import com.thirdlife.thirddonation.api.dto.request.nft.NftMintRequest;
import com.thirdlife.thirddonation.db.entity.nft.Nft;
import com.thirdlife.thirddonation.db.entity.user.User;
import com.thirdlife.thirddonation.db.repository.NftRepository;
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

    /**
     * NFT를 생성하는 메서드입니다.
     *
     * @param nftMintRequest NftMintRequest
     * @param owner User
     */
    @Override
    public void createNft(NftMintRequest nftMintRequest, User owner) {
        Nft nft = nftMintRequest.toEntity();
        nft.setUser(owner);

        nftRepository.save(nft);
    }

}
