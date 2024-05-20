package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.notification.dto.res.NotificationSingleActionRes;
import com.abbboo.backend.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

// 단건 - 알림 이벤트 리스너로 발생될 알림 이벤트 객체
@Getter
public class NotificationSingleEvent extends ApplicationEvent {

    // 보내는 유저
    private User sender;

    // 받는 유저
    private User receiver;

    // 알림 제목
    private String title;
    
    // 알림 종류
    private NotificationEventType notificationEventType;

    @Builder
    public NotificationSingleEvent(Object source, NotificationSingleActionRes notificationSingleActionRes) {
        super(source);
        this.sender = notificationSingleActionRes.getSender();
        this.receiver = notificationSingleActionRes.getReceiver();
        this.title = notificationSingleActionRes.getTitle();
        this.notificationEventType = notificationSingleActionRes.getNotificationEventType();
    }
}
