package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.user.dto.request.ArtistRegisterRequest;

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
}
