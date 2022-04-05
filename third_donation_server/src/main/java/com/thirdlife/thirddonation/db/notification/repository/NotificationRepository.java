package com.thirdlife.thirddonation.db.notification.repository;

import com.thirdlife.thirddonation.db.notification.entity.Notification;
import com.thirdlife.thirddonation.db.user.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * 알림 리포지토리.
 */
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserAndEnabled(User user, Boolean enabled);

    @Modifying
    @Query(value = "update Notification n set n.enabled = :enabled where n.user = :user")
    void setEnabledByUser(@Param("user") User user, @Param("enabled") Boolean enabled);
}
