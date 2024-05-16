package com.abbboo.backend.domain.notification.dto.res;

import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.global.event.NotificationEventType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class NotificationSingleActionRes {
    
    // 보내는 유저
    private User sender;
    
    // 받는 유저
    private User receiver;
    
    // 알림 제목
    private String title;

    // 알림 종류
    private NotificationEventType notificationEventType;

    @Builder
    public NotificationSingleActionRes(User sender, User receiver, String title, NotificationEventType notificationEventType) {
        this.sender = sender;
        this.receiver = receiver;
        this.title = title;
        this.notificationEventType = notificationEventType;
    }
}
