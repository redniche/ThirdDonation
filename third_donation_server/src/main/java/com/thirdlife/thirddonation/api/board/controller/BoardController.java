package com.thirdlife.thirddonation.api.board.controller;

import com.thirdlife.thirddonation.api.board.dto.ArticleInfoDto;
import com.thirdlife.thirddonation.api.board.dto.request.ArticleRegisterRequest;
import com.thirdlife.thirddonation.api.board.dto.response.ArticleInfoResponse;
import com.thirdlife.thirddonation.api.board.dto.response.ArticleListResponse;
import com.thirdlife.thirddonation.api.board.dto.response.CategoryListResponse;
import com.thirdlife.thirddonation.api.board.service.ArticleService;
import com.thirdlife.thirddonation.api.board.service.CategoryService;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.user.entity.Authority;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 게시글 관련의 요청을 처리하는 컨트롤러입니다.
 * 게시글 CRUD, 카테고리 CRD 순으로 정렬되어 있습니다.
 * 카테고리는 구조가 단순하여 Entity 를 그대로 Response 에 담아 보냅니다.
 */
@Slf4j
@Validated
@Api(tags = "게시글 관리")
@RestController
@RequestMapping("${request.path.api}${request.path.board}")
@RequiredArgsConstructor
public class BoardController {

    private final ArticleService articleService;
    private final CategoryService categoryService;

    /**
     * Post 요청시 전송받은 정보로 글을 등록합니다.
     *
     * @param articleRegisterRequest CharityRegisterRequest
     * @return ResponseEntity&lt;BaseResponseBody&gt;
     */
    @PostMapping("${request.path.board.article}")
    @ApiOperation(value = "글 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> createArticle(
            @Valid @RequestBody @ApiParam(value = "글 정보", required = true)
                    ArticleRegisterRequest articleRegisterRequest) {

        articleService.createArticle(articleRegisterRequest);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }


    /**
     * Get 요청시 해당 카테고리의 글 리스트를 반환합니다.
     *
     * @return ResponseEntity
     */
    @GetMapping("${request.path.board.article}")
    @ApiOperation(value = "글 리스트 조회", notes = "다음과 같이 사용한다."
            + "<br>/api/board/article?categoryName='테스트'&page=0&size=5&sort=id?artist=false")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증되지 않은 사용자"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ArticleListResponse> getArticleList(
            @ApiParam(value = "카테고리", required = true) @RequestParam(value = "categoryName")
                    String categoryName,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC)
            @ApiParam(value = "페이지네이션", required = true) final Pageable pageable) {

        Page<ArticleInfoDto>
                articleInfoDtoPage =
                articleService.getArticlePageByCategoryName(categoryName, pageable);

        ArticleListResponse response =
                ArticleListResponse.builder().statusCode(200).message("Success")
                        .data(articleInfoDtoPage).build();

        return ResponseEntity.status(200).body(response);
    }

    /**
     * Get 요청시 해당 카테고리의 글 정보를 반환합니다.
     *
     * @return ResponseEntity
     */
    @GetMapping("${request.path.board.article}/detail")
    @ApiOperation(value = "글 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증되지 않은 사용자"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ArticleInfoResponse> getArticle(
            @ApiParam(value = "게시글 아이디", required = true) @RequestParam(value = "articleId")
                    Integer articleId) {

        ArticleInfoDto
                articleInfoDto =
                articleService.getArticleByArticleId(articleId);

        ArticleInfoResponse response =
                ArticleInfoResponse.builder().statusCode(200).message("Success")
                        .data(articleInfoDto).build();

        return ResponseEntity.status(200).body(response);
    }

    /**
     * Patch 요청시 전송받은 정보로 글을 수정합니다.
     *
     * @return ResponseEntity
     */
    @PatchMapping("${request.path.board.article}")
    @ApiOperation(value = "글 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증되지 않은 사용자"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> modifyArticle(
            @Valid @RequestBody @ApiParam(value = "글 정보", required = true)
                    ArticleRegisterRequest articleRegisterRequest,
            @ApiParam(value = "글 아이디", required = true) @RequestParam(value = "articleId")
                    Integer articleId) {

        articleService.modifyArticle(articleRegisterRequest, articleId);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * Delete 요청 시 글 아이디와 사용자 아이디를 받아와서 글을 삭제한다.
     *
     * @param articleId Integer
     * @param userId    Long
     * @return ResponseEntity
     */
    @DeleteMapping("${request.path.board.article}")
    @ApiOperation(value = "글 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증되지 않은 사용자"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> deleteArticle(
            @ApiParam(value = "글 아이디", required = true) @RequestParam(value = "articleId")
                    Integer articleId,
            @ApiParam(value = "유저 아이디", required = true) @RequestParam(value = "userId")
                    Long userId) {
        articleService.deleteArticle(articleId, userId);
        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * Post 요청시 전송받은 정보로 카테고리를 등록합니다.
     *
     * @param categoryName String
     * @param authority    Authority
     * @return ResponseEntity of BaseResponseBody;
     */
    @PostMapping("${request.path.board.category}")
    @ApiOperation(value = "카테고리 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> createCategory(
            @ApiParam(value = "카테고리 이름", required = true) @RequestParam(value = "categoryName")
                    String categoryName,
            @ApiParam(value = "카테고리 권한", required = true)
            @RequestParam(value = "authority", defaultValue = "ADMIN") Authority authority) {
        System.out.println(authority);
        categoryService.createCategory(categoryName, authority);

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

    /**
     * Get 요청시 카테고리 리스트를 조회합니다.
     *
     * @return ResponseEntity of BaseResponseBody
     */
    @GetMapping("${request.path.board.category}")
    @ApiOperation(value = "카테고리 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> getCategoryList() {
        CategoryListResponse response =
                CategoryListResponse.builder().statusCode(200).message("Success")
                        .data(categoryService.getCategoryList()).build();

        return ResponseEntity.status(200).body(response);
    }

    /**
     * Delete 요청시 카테고리 이름을 입력받아 카테고리를 삭제한다.
     *
     * @param categoryName String
     * @return ResponseEntity
     */
    @DeleteMapping("${request.path.board.category}")
    @ApiOperation(value = "카테고리 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증되지 않은 사용자"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> deleteCategory(
            @NotBlank @ApiParam(value = "카테고리 이름", required = true)
            @RequestParam(value = "categoryName") String categoryName) {
        categoryService.deleteCategory(categoryName);
        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }
}
