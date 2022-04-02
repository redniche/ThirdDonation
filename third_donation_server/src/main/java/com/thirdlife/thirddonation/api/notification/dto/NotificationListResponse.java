package com.thirdlife.thirddonation.api.notification.dto;

import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.notification.entity.Notification;
import io.swagger.annotations.ApiModel;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

/**
 * 알림 리스트 응답.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@ApiModel("NotificationList")
public class NotificationListResponse extends BaseResponseBody {

    private List<Notification> data;

}
