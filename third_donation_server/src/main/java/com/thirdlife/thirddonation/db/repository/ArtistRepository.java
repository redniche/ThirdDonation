package com.thirdlife.thirddonation.db.repository;

import com.thirdlife.thirddonation.db.entity.user.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 장애인 예술가 리포지토리.
 */
@Transactional(readOnly = true)
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    /**
     * 이미 등록 (신청)된 장애인 예술가인지 체크.
     *
     * @param id Long
     * @return boolean
     */
    boolean existsById(Long id);
}
