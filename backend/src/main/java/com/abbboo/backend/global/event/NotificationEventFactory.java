package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.notification.dto.res.NotificationMultipleActionRes;
import com.abbboo.backend.domain.notification.dto.res.NotificationSingleActionRes;
import com.abbboo.backend.domain.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEvent;

// 팩토리 메서드 패턴으로 도메인에 관계없이 이벤트 객체 생성
@Slf4j
public class NotificationEventFactory {

    // 단건 - 꾸욱 누르기 이벤트 알림
    public static ApplicationEvent createPokeEvent(Object source, User sender, User receiver) {

        // 꾸욱 누르기 이벤트 정보 객체 생성
        NotificationSingleActionRes notificationSingleActionRes
                = NotificationSingleActionRes.builder()
                .sender(sender)
                .receiver(receiver)
                .title(sender.getNickname()+"펭귄")
                .notificationEventType(NotificationEventType.POKE)
                .build();

        log.info("꾸욱 누르기 - 이벤트 정보 객체 생성 : OK");

        return new NotificationSingleEvent(source, notificationSingleActionRes);
    }

    // 단건 - 메시지 수신 이벤트 알림
    public static ApplicationEvent createLetterEvent(Object source, User sender, User receiver) {

        // 메시지 수신 이벤트 정보 객체 생성
        NotificationSingleActionRes notificationSingleActionRes
                = NotificationSingleActionRes.builder()
                .sender(sender)
                .receiver(receiver)
                .title(sender.getNickname()+"펭귄")
                .notificationEventType(NotificationEventType.CREATE_LETTER)
                .build();

        log.info("메시지 수신 - 이벤트 정보 객체 생성 : OK");

        return new NotificationSingleEvent(source, notificationSingleActionRes);
    }

    // 단건 - 자동 메시지 수신 이벤트 알림
    public static ApplicationEvent createAutoLetterEvent(Object source, User sender, User receiver) {

        // 자동 메시지 수신 이벤트 정보 객체 생성
        NotificationSingleActionRes notificationSingleActionRes
                = NotificationSingleActionRes.builder()
                .sender(sender)
                .receiver(receiver)
                .title(sender.getNickname()+"펭귄")
                .notificationEventType(NotificationEventType.CREATE_AUTO_LETTER)
                .build();

        log.info("자동 메시지 수신 - 이벤트 정보 객체 생성 : OK");

        return new NotificationSingleEvent(source, notificationSingleActionRes);
    }

    // 단건 - 반응 등록 이벤트 알림
    public static ApplicationEvent createReactionEvent(Object source, User sender, User receiver) {

        // 메시지 수신 이벤트 정보 객체 생성
        NotificationSingleActionRes notificationSingleActionRes
                = NotificationSingleActionRes.builder()
                .sender(sender)
                .receiver(receiver)
                .title(sender.getNickname()+"펭귄")
                .notificationEventType(NotificationEventType.CREATE_REACTION)
                .build();

        log.info("반응 등록 - 이벤트 정보 객체 생성 : OK");

        return new NotificationSingleEvent(source, notificationSingleActionRes);
    }

    // 다건 - 스토리 등록 이벤트 알림
    public static ApplicationEvent createStoryEvent(Object source, User sender, Family family) {

        // 스토리 등록 이벤트 정보 객체 생성
        NotificationMultipleActionRes notificationMultipleActionRes
                = NotificationMultipleActionRes.builder()
                .sender(sender)
                .family(family)
                .title(sender.getNickname()+"펭귄")
                .notificationEventType(NotificationEventType.CREATE_STORY)
                .build();

        log.info("스토리 등록 - 이벤트 정보 객체 생성 : OK");

        return new NotificationMultipleEvent(source, notificationMultipleActionRes);
    }

    // 다건 - 온실 레벨 업 이벤트 알림
    public static ApplicationEvent createLevelUpEvent(Object source, User sender, Family family) {

        // 온실 레벨 업 이벤트 정보 객체 생성
        NotificationMultipleActionRes notificationMultipleActionRes
                = NotificationMultipleActionRes.builder()
                .sender(sender)
                .family(family)
                .title(sender.getNickname()+"펭귄")
                .notificationEventType(NotificationEventType.LEVEL_UP_GREENHOUSE)
                .build();

        log.info("온실 레벨 업 - 이벤트 정보 객체 생성 : OK");

        return new NotificationMultipleEvent(source, notificationMultipleActionRes);
    }

    // 다건 - 온실 레벨 업 버튼 활성화 이벤트 알림
    public static ApplicationEvent createLevelUpButtonActiveEvent(Object source, User sender, Family family) {

        // 온실 레벨 업 이벤트 정보 객체 생성
        NotificationMultipleActionRes notificationMultipleActionRes
                = NotificationMultipleActionRes.builder()
                .sender(sender)
                .family(family)
                .title(sender.getNickname()+"펭귄")
                .notificationEventType(NotificationEventType.LEVEL_UP_BUTTON_ACTIVE_GREENHOUSE)
                .build();

        log.info("온실 레벨 업 버튼 활성화 - 이벤트 정보 객체 생성 : OK");

        return new NotificationMultipleEvent(source, notificationMultipleActionRes);
    }
}