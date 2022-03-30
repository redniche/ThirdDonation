package com.thirdlife.thirddonation.api.board.service;

import com.thirdlife.thirddonation.api.board.dto.ArticleInfoDto;
import com.thirdlife.thirddonation.api.board.dto.request.ArticleRegisterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 글 서비스입니다.
 */
public interface ArticleService {
    /**
     * 글을 생성하는 메서드입니다.
     *
     * @param articleRegisterRequest CharityRegisterRequest
     */
    void createArticle(ArticleRegisterRequest articleRegisterRequest);

    /**
     * 글을 수정하는 메서드입니다.
     *
     * @param articleRegisterRequest CharityRegisterRequest
     * @param articleId articleRegisterRequest
     */
    void modifyArticle(ArticleRegisterRequest articleRegisterRequest, Integer articleId);

    /**
     * 글을 삭제하는 메서드입니다.
     *
     * @param articleId Integer
     * @param userId Long
     */
    void deleteArticle(Integer articleId, Long userId);

    /**
     * 글 페이지를 반환하는 메서드입니다.
     * 글 내부 정보는 반환하지 않습니다.
     *
     * @return Page of ArticleInfoDto
     */
    Page<ArticleInfoDto> getArticlePageByCategoryName(String categoryName, Pageable pageable);

    /**
     * 글 상세 정보를 반환하는 메서드입니다.
     *
     * @return ArticleInfoDto
     */
    ArticleInfoDto getArticleByArticleId(Integer articleId);
}
