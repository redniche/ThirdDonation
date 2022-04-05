package com.thirdlife.thirddonation.db.board.repository;

import com.thirdlife.thirddonation.db.board.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 글 내용 리포지토리입니다.
 */
@Transactional(readOnly = true)
public interface ContentRepository extends JpaRepository<Content, Integer> {

}
