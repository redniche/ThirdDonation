package com.thirdlife.thirddonation.api.board.dto.response;

import com.thirdlife.thirddonation.api.board.dto.ArticleInfoDto;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

/**
 * 글 리스트를 반환하는 DTO.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@ApiModel("ArticleInfo")
public class ArticleInfoResponse extends BaseResponseBody {
    private ArticleInfoDto data;
}
