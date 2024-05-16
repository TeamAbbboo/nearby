package com.abbboo.backend.global.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationEventType {
    
    // 알림 이벤트 종류 열거
    ;
    
    private final String message;
}
