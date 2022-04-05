package com.thirdlife.thirddonation.api.board.service;

import com.thirdlife.thirddonation.db.board.entity.Category;
import com.thirdlife.thirddonation.db.user.entity.Authority;
import java.util.List;

/**
 * 카테고리 서비스입니다.
 */
public interface CategoryService {
    /**
     * 카테고리를 생성하는 메서드입니다.
     *
     * @param categoryName String
     * @param authority Authority
     */
    void createCategory(String categoryName, Authority authority);

    /**
     * 카테고리를 삭제하는 메서드입니다.
     *
     * @param categoryName String
     */
    void deleteCategory(String categoryName);

    /**
     * 카테고리 리스트를 반환받는 메서드입니다.
     *
     * @return List of Category
     */
    List<Category> getCategoryList();
}
