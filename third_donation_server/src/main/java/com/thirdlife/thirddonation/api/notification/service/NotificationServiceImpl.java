package com.thirdlife.thirddonation.api.notification.service;

import com.thirdlife.thirddonation.api.notification.dto.NotificationInfoDto;
import com.thirdlife.thirddonation.api.user.service.UserService;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.notification.entity.Notification;
import com.thirdlife.thirddonation.db.notification.repository.NotificationRepository;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 알림 서비스 구현.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    /**
     * 알림 리스트 반환
     *
     * @return List
     */
    @Override
    public List<NotificationInfoDto> getList() {

        User user = userService.getAuthUser();

        return notificationRepository.findByUserAndEnabled(user, true)
                .stream().map(NotificationInfoDto::of).collect(Collectors.toList());
    }

    /**
     * 알람 리스트 읽기 처리.
     *
     */
    @Override
    public void setDisabled() {

        User user = userService.getAuthUser();

        notificationRepository.setEnabledByUser(user, false);
    }
}
