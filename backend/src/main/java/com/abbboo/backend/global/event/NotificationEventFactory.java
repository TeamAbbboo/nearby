package com.abbboo.backend.global.event;

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

    // 다건 - 스토리 등록 이벤트 알림
    public static ApplicationEvent createStoryEvent(Object source, User sender) {

        // 스토리 등록 이벤트 정보 객체 생성
        NotificationMultipleActionRes notificationMultipleActionRes
                = NotificationMultipleActionRes.builder()
                .sender(sender)
                .title(sender.getNickname()+"펭귄")
                .notificationEventType(NotificationEventType.CREATE_STORY)
                .build();

        log.info("스토리 등록 - 이벤트 정보 객체 생성 : OK");

        return new NotificationMultipleEvent(source, notificationMultipleActionRes);
    }
}