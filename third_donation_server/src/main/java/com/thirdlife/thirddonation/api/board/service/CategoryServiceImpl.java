package com.thirdlife.thirddonation.api.board.service;

import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.board.entity.Category;
import com.thirdlife.thirddonation.db.board.repository.CategoryRepository;
import com.thirdlife.thirddonation.db.user.entity.Authority;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 카테고리 서비스의 구현체입니다.
 */
@Service
@Transactional
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    /**
     * 카테고리를 생성하는 메서드입니다.
     *
     * @param categoryName String
     * @param authority Authority
     */
    @Override
    public void createCategory(String categoryName, Authority authority) {
        categoryRepository.save(Category.builder().name(categoryName).authority(authority).build());
    }

    /**
     * 카테고리를 삭제하는 메서드입니다.
     *
     * @param categoryName String
     */
    @Override
    public void deleteCategory(String categoryName) {
        Category category =
                categoryRepository.findByName(categoryName).orElseThrow(() -> new CustomException(
                        ErrorCode.CATEGORY_NOT_FOUND));
        categoryRepository.delete(category);
    }

    /**
     * 카테고리 리스트를 반환받는 메서드입니다.
     *
     * @return List of Category
     */
    @Override
    public List<Category> getCategoryList() {
        return categoryRepository.findAll();
    }
}
