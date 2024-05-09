package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.user.entity.User;
import org.springframework.context.ApplicationEvent;

//팩토리 메서드 패턴으로 도메인에 관계없이 이벤트 객체 생성
public class ExpEventFactory {
    public static ApplicationEvent createLoginEvent(Object source,User user) {
        return new ExpEvent(source, user, ExpEvent.ExpType.DAILY_LOGIN);
    }


    public static ApplicationEvent createLetterEvent(Object source,User user) {
        return new ExpEvent(source, user, ExpEvent.ExpType.HEARTFUL_LETTER);
    }

    public static ApplicationEvent createStoryEvent(Object source,User user) {
        return new ExpEvent(source,user, ExpEvent.ExpType.UPLOAD_STORY);
    }

    public static ApplicationEvent createForcedMessageEvent(Object source,User user) {
        return new ExpEvent(source, user, ExpEvent.ExpType.FORCED_MESSAGE);
    }

}

