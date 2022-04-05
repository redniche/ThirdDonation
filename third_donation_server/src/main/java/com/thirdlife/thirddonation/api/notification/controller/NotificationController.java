package com.thirdlife.thirddonation.api.notification.controller;

import com.thirdlife.thirddonation.api.notification.dto.NotificationInfoDto;
import com.thirdlife.thirddonation.api.notification.dto.NotificationListResponse;
import com.thirdlife.thirddonation.api.notification.service.NotificationService;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.notification.entity.Notification;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 알림 컨트롤러.
 */
@Validated
@Api(tags = "알림 관리")
@RestController
@RequestMapping("${request.path.api}${request.path.notifications}")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /**
     * 알림 리스트 반환.
     *
     * @param userId Long
     * @return ResponseEntity
     */
    @GetMapping("/{userId}")
    @ApiOperation(value = "알림 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NotificationListResponse> getList(
            @Positive @PathVariable
            @ApiParam(value = "조회할 회원 id를 입력받음", required = false)
                    Long userId
    ) {

        List<NotificationInfoDto> list = notificationService.getList();

        return ResponseEntity.status(200)
                .body(NotificationListResponse.builder().statusCode(200).message("Success")
                        .data(list).build());
    }

    /**
     * 알림 읽기 처리.
     *
     * @param userId Long
     * @return ResponseEntity
     */
    @PatchMapping("/read/{userId}")
    @ApiOperation(value = "알림 읽기 처리")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> setDisabled(
            @Positive @PathVariable
            @ApiParam(value = "조회할 회원 id를 입력받음", required = false)
                    Long userId
    ) {

        notificationService.setDisabled();

        return ResponseEntity.status(200)
                .body(BaseResponseBody.builder().statusCode(200).message("Success").build());
    }

}
