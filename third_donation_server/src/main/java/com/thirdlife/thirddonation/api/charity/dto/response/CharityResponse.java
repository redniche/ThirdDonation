package com.thirdlife.thirddonation.api.charity.dto.response;

import com.thirdlife.thirddonation.api.charity.dto.CharityInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.springframework.data.domain.Page;

/**
 * 자선 단체 리스트를 반환하는 DTO.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class CharityResponse extends BaseResponseBody {

    private Page<CharityInfoDto> data;

}

