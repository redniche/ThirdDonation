package com.thirdlife.thirddonation.api.board.service;

import com.thirdlife.thirddonation.api.board.dto.ArticleInfoDto;
import com.thirdlife.thirddonation.api.board.dto.request.ArticleRegisterRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.board.entity.Article;
import com.thirdlife.thirddonation.db.board.entity.Category;
import com.thirdlife.thirddonation.db.board.entity.Content;
import com.thirdlife.thirddonation.db.board.repository.ArticleRepository;
import com.thirdlife.thirddonation.db.board.repository.CategoryRepository;
import com.thirdlife.thirddonation.db.user.entity.Authority;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import java.util.Objects;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 유저 서비스의 구현체입니다.
 */
@Service
@Transactional
@AllArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    /**
     * 글을 생성하는 메서드입니다.
     *
     * @param articleRegisterRequest CharityRegisterRequest
     */
    @Override
    public void createArticle(ArticleRegisterRequest articleRegisterRequest) {
        final User writer = userRepository.findById(articleRegisterRequest.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        final Category category =
                categoryRepository.findByName(articleRegisterRequest.getCategoryName())
                        .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND));

        Authority userAuthority = writer.getAuthority();
        Authority categoryAuthority = category.getAuthority();
        if (userAuthority.compareTo(categoryAuthority) < 0) {
            throw new CustomException(ErrorCode.AUTHORITY_INVALID);
        }
        Article article = articleRegisterRequest.toEntity();
        article.setUser(writer);
        article.setCategory(category);

        articleRepository.save(article);
    }

    /**
     * 글을 수정하는 메서드입니다.
     *
     * @param articleRegisterRequest CharityRegisterRequest
     */
    @Override
    public void modifyArticle(ArticleRegisterRequest articleRegisterRequest, Integer articleId) {
        Article article =
                articleRepository.findById(articleId).orElseThrow(() -> new CustomException(
                        ErrorCode.ARTICLE_NOT_FOUND));
        final Long requestUserId = articleRegisterRequest.getUserId();
        final User writer = userRepository.findById(requestUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (!requestUserId.equals(writer.getId())) {
            throw new CustomException(ErrorCode.USER_INVALID);
        }
        article.setTitle(articleRegisterRequest.getTitle());
        article.getContent().setText(articleRegisterRequest.getContentText());

        articleRepository.save(article);
    }

    /**
     * 글을 삭제하는 메서드입니다.
     *
     * @param articleId Integer
     * @param userId    Long
     */
    @Override
    public void deleteArticle(Integer articleId, Long userId) {
        Article article =
                articleRepository.findById(articleId).orElseThrow(() -> new CustomException(
                        ErrorCode.ARTICLE_NOT_FOUND));
        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Long articleWriterId = article.getUser().getId();
        if (!Objects.equals(articleWriterId, user.getId())) {
            throw new CustomException(ErrorCode.USER_INVALID);
        }
        articleRepository.delete(article);
    }

    /**
     * 글 페이지를 반환하는 메서드입니다.
     * 글 내부 정보는 반환하지 않습니다.
     *
     * @return Page of ArticleInfoDto
     */
    @Override
    public Page<ArticleInfoDto> getArticlePageByCategoryName(String categoryName,
                                                             Pageable pageable) {
        return articleRepository.findAllByCategoryName(categoryName, pageable)
                .map(ArticleInfoDto::of);
    }

    /**
     * 글 상세 정보를 반환하는 메서드입니다.
     *
     * @param articleId Integer
     * @return ArticleInfoDto
     */
    @Override
    public ArticleInfoDto getArticleByArticleId(Integer articleId) {
        return ArticleInfoDto.of2(articleRepository.findById(articleId)
                .orElseThrow(() -> new CustomException(ErrorCode.ARTICLE_NOT_FOUND)));
    }
}
