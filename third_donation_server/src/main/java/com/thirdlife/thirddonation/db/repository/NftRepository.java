package com.thirdlife.thirddonation.db.repository;

import com.thirdlife.thirddonation.db.entity.nft.Nft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * NFT 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface NftRepository extends JpaRepository<Nft, Long> {

}
