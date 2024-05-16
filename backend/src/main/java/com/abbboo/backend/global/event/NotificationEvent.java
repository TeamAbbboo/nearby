package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.notification.dto.res.NotificationPokeActionRes;
import com.abbboo.backend.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

// 알림 이벤트 리스너로 발생될 알림 이벤트 객체
@Getter
public class NotificationEvent extends ApplicationEvent {

    // 보내는 유저
    private User seder;

    // 받는 유저
    private User receiver;

    // 알림 제목
    private String title;
    
    // 알림 종류
    private NotificationEventType notificationEventType;

    @Builder
    public NotificationEvent(Object source, NotificationPokeActionRes notificationPokeActionRes) {
        super(source);
        this.seder = notificationPokeActionRes.getSender();
        this.receiver = notificationPokeActionRes.getReceiver();
        this.title = notificationPokeActionRes.getTitle();
        this.notificationEventType = notificationPokeActionRes.getNotificationEventType();
    }
}
