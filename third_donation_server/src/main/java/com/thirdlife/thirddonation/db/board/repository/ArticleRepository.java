package com.thirdlife.thirddonation.db.board.repository;

import com.thirdlife.thirddonation.db.board.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 글 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface ArticleRepository extends JpaRepository<Article, Integer> {
    Page<Article> findAllByCategoryName(String categoryName, Pageable pageable);
}
