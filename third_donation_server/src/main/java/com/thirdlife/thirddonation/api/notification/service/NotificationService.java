package com.thirdlife.thirddonation.api.notification.service;

import com.thirdlife.thirddonation.api.notification.dto.NotificationInfoDto;
import com.thirdlife.thirddonation.db.notification.entity.Notification;
import java.util.List;

/**
 * 알림 서비스.
 */
public interface NotificationService {

    List<NotificationInfoDto> getList();

    void setDisabled();
}
