package com.abbboo.backend.global.event;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

// 이벤트를 발생시켰을 시에 eventlistner가 공통적으로 처리
@Component
public class NotificationEventListener implements ApplicationListener<NotificationEvent> {
    @Override
    public void onApplicationEvent(NotificationEvent event) {

    }
}
