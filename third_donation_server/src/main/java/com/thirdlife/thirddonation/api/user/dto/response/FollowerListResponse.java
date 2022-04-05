package com.thirdlife.thirddonation.api.user.dto.response;


import com.thirdlife.thirddonation.api.user.dto.UserInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.log.document.DailyIncome;
import io.swagger.annotations.ApiModel;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

/**
 * 팔로워 리스트 반환.
 */
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel("UserDailyIncome")
public class FollowerListResponse extends BaseResponseBody {

    // 팔로워 이름
    private List<UserInfoDto> data;

}
