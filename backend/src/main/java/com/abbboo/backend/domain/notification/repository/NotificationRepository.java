package com.abbboo.backend.domain.notification.repository;

import com.abbboo.backend.domain.notification.dto.res.ReceivedNotificationRes;
import com.abbboo.backend.domain.notification.entity.Notification;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // 전체 알림 내역 조회
    @Query("select new com.abbboo.backend.domain.notification.dto.res.ReceivedNotificationRes(" +
            "n.id, u.id, u.nickname, u.mood, n.title, n.content, n.createdAt, n.isRead)" +
            "from Notification n join User u on u.id = n.sender.id " +
            "where n.receiver.id= :receiverId")
    Slice<ReceivedNotificationRes> findReceivedNotification(@Param("receiverId") int receiverId,
                                                       PageRequest pageRequest);
}
