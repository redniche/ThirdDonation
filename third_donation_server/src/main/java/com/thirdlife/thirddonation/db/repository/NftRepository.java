package com.thirdlife.thirddonation.db.repository;

import com.thirdlife.thirddonation.db.entity.nft.Nft;
import java.util.List;
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
    Optional<Page<Nft>> findAllByUserId(Long userId, Pageable pageable);
}
