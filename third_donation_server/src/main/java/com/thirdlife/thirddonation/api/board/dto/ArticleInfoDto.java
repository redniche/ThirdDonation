package com.thirdlife.thirddonation.api.board.dto;

import com.thirdlife.thirddonation.api.user.dto.UserInfoDto;
import com.thirdlife.thirddonation.db.board.entity.Article;
import com.thirdlife.thirddonation.db.board.entity.Content;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * ArticleInfoDto 글 정보를 담을 Dto 클래스입니다.
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ArticleInfoDto {
    private Integer id;

    private UserInfoDto user;

    private String categoryName;

    private String title;

    private Integer views;

    private String contentText;

    private Boolean isReply;

    /**
     * 글의 리스트를 불러올 때의 정보를 반환합니다.
     *
     * @param article Cherity 자선단체 객체
     * @return CherityInfoDto 자선단체 정보 Dto
     */
    public static ArticleInfoDto of(Article article) {
        return ArticleInfoDto.builder()
                .id(article.getId())
                .user(UserInfoDto.of(article.getUser()))
                .categoryName(article.getCategory().getName())
                .title(article.getTitle())
                .views(article.getViews())
                .build();
    }

    /**
     * 글의 상세 전체 정보를 반환합니다.
     *
     * @param article Cherity 자선단체 객체
     * @return CherityInfoDto 자선단체 정보 Dto
     */
    public static ArticleInfoDto of2(Article article) {
        Content temp = article.getContent();
        return ArticleInfoDto.builder()
                .id(article.getId())
                .user(UserInfoDto.of(article.getUser()))
                .categoryName(article.getCategory().getName())
                .title(article.getTitle())
                .views(article.getViews())
                .contentText(temp.getText())
                .isReply(temp.getIsReply())
                .build();
    }
}
