package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.notification.dto.res.NotificationMultipleActionRes;
import com.abbboo.backend.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

// 다건 - 알림 이벤트 리스너로 발생될 알림 이벤트 객체
@Getter
public class NotificationMultipleEvent extends ApplicationEvent {

    // 보내는 유저
    private User sender;

    // 포함된 가족
    private Family family;

    // 알림 제목
    private String title;

    // 알림 종류
    private NotificationEventType notificationEventType;

    @Builder
    public NotificationMultipleEvent(Object source, NotificationMultipleActionRes notificationMultipleActionRes) {
        super(source);
        this.sender = notificationMultipleActionRes.getSender();
        this.family = notificationMultipleActionRes.getFamily();
        this.title = notificationMultipleActionRes.getTitle();
        this.notificationEventType = notificationMultipleActionRes.getNotificationEventType();
    }
}
