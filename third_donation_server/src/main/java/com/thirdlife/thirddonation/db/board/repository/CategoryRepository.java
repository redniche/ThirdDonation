package com.thirdlife.thirddonation.db.board.repository;

import com.thirdlife.thirddonation.db.board.entity.Category;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 카테고리 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByName(String name);
}
