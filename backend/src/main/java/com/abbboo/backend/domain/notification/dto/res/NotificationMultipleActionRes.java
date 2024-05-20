package com.abbboo.backend.domain.notification.dto.res;

import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.global.event.NotificationEventType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class NotificationMultipleActionRes {

    // 보내는 유저
    private User sender;

    // 유저가 포함된 가족
    private Family family;

    // 알림 제목
    private String title;

    // 알림 종류
    private NotificationEventType notificationEventType;

    @Builder
    public NotificationMultipleActionRes(User sender, Family family, String title, NotificationEventType notificationEventType) {
        this.sender = sender;
        this.family = family;
        this.title = title;
        this.notificationEventType = notificationEventType;
    }
}
