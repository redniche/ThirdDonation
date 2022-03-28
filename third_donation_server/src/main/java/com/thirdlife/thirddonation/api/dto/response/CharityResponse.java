package com.thirdlife.thirddonation.api.dto.response;

import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.entity.charity.Charity;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

/**
 * 자선 단체 리스트를 반환하는 DTO.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class CharityResponse extends BaseResponseBody {

    private List<Charity> data;

}
