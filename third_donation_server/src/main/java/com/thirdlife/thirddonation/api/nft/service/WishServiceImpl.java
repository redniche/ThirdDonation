package com.thirdlife.thirddonation.api.nft.service;

import com.thirdlife.thirddonation.api.nft.dto.request.WishRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.nft.entity.Nft;
import com.thirdlife.thirddonation.db.nft.entity.Wish;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.nft.repository.NftRepository;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import com.thirdlife.thirddonation.db.nft.repository.WishRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * NFT 찜 서비스.
 */
@Service
@Transactional
@AllArgsConstructor
public class WishServiceImpl implements WishService {

    private final WishRepository wishRepository;
    private final NftRepository nftRepository;
    private final UserRepository userRepository;

    /**
     * NFT 찜 정보를 등록하는 메서드입니다.
     *
     * @param wishRequest WishRequest
     */
    @Override
    public void createWish(WishRequest wishRequest) {

        final User user = userRepository.findById(wishRequest.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Nft nft = nftRepository.findById(wishRequest.getTokenId())
                .orElseThrow(() -> new CustomException(ErrorCode.NFT_NOT_FOUND));

        if (user.equals(nft.getUser())) {
            throw new CustomException(ErrorCode.CANNOT_WISH_MYSELF);
        }

        wishRepository.findByUserAndNft(user, nft)
                .ifPresent(wish -> {
                    throw new CustomException(ErrorCode.WISH_DUPLICATE);
                });

        nft.increaseWishCount();

        wishRepository.save(Wish.builder()
                .user(user)
                .nft(nft)
                .build()
        );
    }

    /**
     * NFT 찜 정보를 삭제하는 메서드입니다.
     *
     * @param wishRequest WishRequest
     */
    @Override
    public void deleteWish(WishRequest wishRequest) {

        final User user = userRepository.findById(wishRequest.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Nft nft = nftRepository.findById(wishRequest.getTokenId())
                .orElseThrow(() -> new CustomException(ErrorCode.NFT_NOT_FOUND));

        Wish wish = wishRepository.findByUserAndNft(user, nft)
                .orElseThrow(() -> new CustomException(ErrorCode.WISH_NOT_FOUND));

        nft.decreaseWishCount();

        wishRepository.delete(wish);
    }
}