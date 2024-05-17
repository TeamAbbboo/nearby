package com.abbboo.backend.global.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationEventType {
    
    // 알림 이벤트 종류
    POKE("\"꾸욱\" 당신의 소식을 궁금해하는 펭귄이 있어요!")
    ;

    private final String message;
}
