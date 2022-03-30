package com.thirdlife.thirddonation.api.board.dto.response;

import com.thirdlife.thirddonation.api.board.dto.ArticleInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
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
@ApiModel("ArticleList")
public class ArticleListResponse extends BaseResponseBody {
    private List<ArticleInfoDto> data;
}
