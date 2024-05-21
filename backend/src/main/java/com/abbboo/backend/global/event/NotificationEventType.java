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
    CREATE_AUTO_LETTER("\"또롱!\" 가까이가 대신해서 애정 메시지를 전달했어요!! 소식을 전해주세요!"),
    CREATE_REACTION("\"우와!\" 내 소식에 반응이 달렸어요!! \n 확인해 볼까요?"),
    LEVEL_UP_GREENHOUSE("\"레벨 업!\" 민들레가 성장했어요!! \n 더 많은 소통 기대할게요!"),
    LEVEL_UP_BUTTON_ACTIVE_GREENHOUSE("\"두둔!\" 레벨 업 버튼이 활성화 되었습니다!! \n 두근두근 다음 민들레를 만나러 가볼까요?")
    ;

    private final String message;
}
