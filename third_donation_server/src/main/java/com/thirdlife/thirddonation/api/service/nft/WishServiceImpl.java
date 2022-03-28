package com.thirdlife.thirddonation.api.service.nft;

import com.thirdlife.thirddonation.api.dto.request.nft.WishRequest;
import com.thirdlife.thirddonation.api.exception.CustomException;
import com.thirdlife.thirddonation.api.exception.ErrorCode;
import com.thirdlife.thirddonation.db.entity.nft.Nft;
import com.thirdlife.thirddonation.db.entity.nft.Wish;
import com.thirdlife.thirddonation.db.entity.user.User;
import com.thirdlife.thirddonation.db.repository.NftRepository;
import com.thirdlife.thirddonation.db.repository.UserRepository;
import com.thirdlife.thirddonation.db.repository.WishRepository;
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