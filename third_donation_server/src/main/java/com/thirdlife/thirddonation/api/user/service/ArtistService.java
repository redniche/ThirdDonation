package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.user.dto.ArtistInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

/**
 * 장애인 예술가 서비스.
 */
public interface ArtistService {

    /**
     * 장애인 예술가 신청 요청 등록.
     *
     * @param name String
     * @param registerNumber String
     * @param multipartFile MultipartFile
     */
    void createArtist(String name, String registerNumber, MultipartFile multipartFile);

    /**
     * 장애인 예술가 조회.
     *
     * @param pageable Pageable
     * @return Page
     */
    Page<ArtistInfoDto> getArtistList(Pageable pageable);

    /**
     * 장애인 예술가 허가.
     *
     * @param userId Long
     */
    void enableArtist(Long userId);


    /**
     * 장애인 예술가 비활성.
     *
     * @param userId Long
     */
    void disableArtist(Long userId);
}
