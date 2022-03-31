package com.thirdlife.thirddonation.api.log.controller;

import com.thirdlife.thirddonation.common.scheduler.dto.LogByDayDto;
import com.thirdlife.thirddonation.common.scheduler.service.IncomeLogAggregation;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 테스트용.
 */
@Slf4j
@Validated
@Api(tags = "통계 테스트")
@RestController
@RequestMapping("${request.path.api}/test")
@RequiredArgsConstructor
public class AggreTestController {

    private final IncomeLogAggregation loggingService;

    /**
     * Get 요청시 해당 카테고리의 글 정보를 반환합니다.
     *
     * @return ResponseEntity
     */
    @GetMapping()
    @ApiOperation(value = "거래 로그 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증되지 않은 사용자"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<LogByDayDto>> getLog(
            @ApiParam(value = "유저 아이디", required = true) @RequestParam(value = "userId")
                    Long userId) {

        List<LogByDayDto> response = loggingService.aggregateByDay(userId);

        return ResponseEntity.status(200).body(response);
    }

}
