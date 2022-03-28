package com.thirdlife.thirddonation.db.repository;

import com.thirdlife.thirddonation.db.entity.nft.Nft;
import com.thirdlife.thirddonation.db.entity.nft.Wish;
import com.thirdlife.thirddonation.db.entity.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 찜 리포지토리.
 */
@Transactional(readOnly = true)
public interface WishRepository extends JpaRepository<Wish, Long> {
    /**
     * Wish 엔티티 조회.
     *
     * @param user user
     * @param nft Nft
     * @return Optional
     */
    Optional<Wish> findByUserAndNft(User user, Nft nft);
}
