package com.thirdlife.thirddonation.api.user.dto;

import com.thirdlife.thirddonation.db.user.entity.Artist;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ArtistInfoDto 아티스트 정보를 담을 Dto 클래스입니다.
 */
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class ArtistInfoDto {

    private Long id;
    private String name;
    private String registerNumber;
    private String filePath;
    private boolean enabled;

    /**
     * 아티스트 조회 정보를 반환합니다.
     *
     * @param artist Artist 아티스트 객체
     * @return ArtistInfoDto 아티스트 정보 Dto
     */
    public static ArtistInfoDto of(Artist artist) {
        return ArtistInfoDto.builder()
                .id(artist.getId())
                .name(artist.getName())
                .registerNumber(artist.getRegisterNumber())
                .filePath(artist.getFilePath())
                .enabled(artist.isEnabled())
                .build();
    }
}
