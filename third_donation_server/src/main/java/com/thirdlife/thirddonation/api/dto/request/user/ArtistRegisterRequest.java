package com.thirdlife.thirddonation.api.dto.request.user;

import com.thirdlife.thirddonation.db.entity.user.Artist;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;

/**
 * 장애인 등록 신청 DTO.
 */
@Getter
public class ArtistRegisterRequest {

    @NotNull
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String registerNumber;

    @NotBlank
    private String filePath;

    /**
     * 요청 값을 기반으로 Artist Entity 반환.
     *
     * @return Artist
     */
    public Artist toEntity() {
        return Artist.builder()
                .name(name)
                .registerNumber(registerNumber)
                .filePath(filePath)
                .enabled(false)
                .build();
    }
}
