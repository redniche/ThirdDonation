package com.thirdlife.thirddonation.db.nft.repository;

import com.thirdlife.thirddonation.db.nft.entity.Nft;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * NFT 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface NftRepository extends JpaRepository<Nft, Long> {
    Optional<Page<Nft>> findAllByOwnerId(Long ownerId, Pageable pageable);

    Optional<Page<Nft>> findAllByArtistId(Long userId, Pageable pageable);
}
