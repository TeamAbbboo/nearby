package com.abbboo.backend.global.event;

import org.springframework.context.ApplicationEvent;

// 알림 이벤트 리스너로 발생될 알림 이벤트 객체
public class NotificationEvent extends ApplicationEvent {

    public NotificationEvent(Object source) {
        super(source);
    }
}
