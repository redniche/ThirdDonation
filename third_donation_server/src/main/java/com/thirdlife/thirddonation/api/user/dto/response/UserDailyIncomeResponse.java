package com.thirdlife.thirddonation.api.user.dto.response;

import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.log.document.DailyIncome;
import io.swagger.annotations.ApiModel;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

/**
 * 사용자의 최근 1주일간 일별 수익 반환 DTo.
 */
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel("UserDailyIncome")
public class UserDailyIncomeResponse extends BaseResponseBody {

    private List<DailyIncome> data;

}
