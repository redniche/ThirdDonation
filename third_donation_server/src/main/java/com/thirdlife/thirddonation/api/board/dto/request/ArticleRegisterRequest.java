package com.thirdlife.thirddonation.api.board.dto.request;

import com.thirdlife.thirddonation.db.board.entity.Article;
import com.thirdlife.thirddonation.db.board.entity.Content;
import javax.validation.constraints.NotBlank;
import lombok.Getter;

/**
 * 글 등록을 위한 DTO.
 */
@Getter
public class ArticleRegisterRequest {

    @Deprecated
    private Long userId;

    @NotBlank
    private String categoryName;

    @NotBlank
    private String title;

    @NotBlank
    private String contentText;

    /**
     * 요청 값을 기반으로 Article 엔티티를 반환합니다.
     * title 과 contentText 만 채워넣습니다.
     *
     * @return Article
     */
    public Article toEntity() {
        return Article.builder()
                .title(title)
                .content(Content.builder().text(contentText).build())
                .build();
    }
}
