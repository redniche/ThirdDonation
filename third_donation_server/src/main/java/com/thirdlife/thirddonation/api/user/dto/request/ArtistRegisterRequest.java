package com.thirdlife.thirddonation.api.user.dto.request;

import com.thirdlife.thirddonation.db.user.entity.Artist;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

/**
 * 장애인 등록 신청 DTO.
 */
@Getter
public class ArtistRegisterRequest {

    @NotNull
    private Long userId;

    @NotBlank
    private String name;

    @NotBlank
    private String registerNumber;

    @NotBlank
    private MultipartFile imageFile;

    /**
     * 요청 값을 기반으로 Artist Entity 반환.
     *
     * @return Artist
     */
    public Artist toEntity() {
        return Artist.builder()
                .name(name)
                .registerNumber(registerNumber)
                .enabled(false)
                .build();
    }
}
