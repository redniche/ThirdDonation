package com.thirdlife.thirddonation.api.board.dto.response;

import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.board.entity.Category;
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
@ApiModel("CategoryList")
public class CategoryListResponse extends BaseResponseBody {
    private List<Category> data;
}
