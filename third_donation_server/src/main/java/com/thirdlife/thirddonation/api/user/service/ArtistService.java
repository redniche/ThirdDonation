package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.user.dto.ArtistInfoDto;
import com.thirdlife.thirddonation.api.user.dto.request.ArtistRegisterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 장애인 예술가 서비스.
 */
public interface ArtistService {
    /**
     * 장애인 예술가 신청 요청 등록.
     *
     * @param artistRegisterRequest ArtistRegisterRequest
     */
    void createArtist(ArtistRegisterRequest artistRegisterRequest);

    /**
     * 장애인 예술가 조회.
     *
     * @param pageable Pageable
     * @return Page
     */
    Page<ArtistInfoDto> getArtistList(Pageable pageable);

    /**
     * 장애인 예술가 등록 토글.
     *
     * @param userId Long
     */
    void enableArtist(Long userId);
}
