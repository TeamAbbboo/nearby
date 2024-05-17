package com.abbboo.backend.global.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationEventType {
    
    // 알림 이벤트 종류
    POKE("\"꾸욱\" 당신의 소식을 궁금해하는 펭귄이 있어요!"),
    CREATE_STORY("\"짜잔!\" 새로운 소식이 등록되었어요!! 보러 가볼까요?"),
    CREATE_LETTER("\"띵동!\" 새로운 메시지가 도착했습니다!! \n마음함을 확인해보세요!"),
    CREATE_REACTION("\"우와!\" 내 소식에 반응이 달렸어요!! \n 확인해 볼까요?")
    ;

    private final String message;
}
