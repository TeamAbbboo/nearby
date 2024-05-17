package com.abbboo.backend.global.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationEventType {
    
    // 알림 이벤트 종류
    POKE("\"꾸욱\" 당신의 소식을 궁금해하는 펭귄이 있어요!"),
    CREATE_STORY("\"짜잔!\" 가족 중 누가 소식을 등록했어요!! 보러 가볼까요?" ),
    CREATE_LETTER("\"띵동!\" 새로운 메시지가 도착했습니다!! ")
    ;

    private final String message;
}
