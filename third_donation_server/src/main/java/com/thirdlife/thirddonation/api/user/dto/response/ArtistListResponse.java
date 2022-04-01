package com.thirdlife.thirddonation.api.user.dto.response;

import com.thirdlife.thirddonation.api.user.dto.ArtistInfoDto;
import com.thirdlife.thirddonation.api.user.dto.UserInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.user.entity.User;
import io.swagger.annotations.ApiModel;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.springframework.data.domain.Page;

/**
 * 유저의 일부 정보만 반환 받습니다.
 * description 이 제외되어 있습니다.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@ApiModel("Artist")
public class ArtistListResponse extends BaseResponseBody {
    private Page<ArtistInfoDto> data;
}
