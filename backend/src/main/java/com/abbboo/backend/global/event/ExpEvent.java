package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.user.entity.User;
import org.springframework.context.ApplicationEvent;

//경험치 이벤트 리스너로 발생될 경험치 이벤트 객체
public class ExpEvent extends ApplicationEvent {
    enum ExpType {
        DAILY_LOGIN("일일 로그인으로 경험치",1),
        HEARTFUL_LETTER("정성스러운 편지 작성으로 경험치",3),
        UPLOAD_STORY("스토리 작성으로 경험치",5),
        FORCED_MESSAGE("강제 오글 메시지 작성으로 경험치",-3),
        ;
        final String content;
        final int point;

        ExpType(String content, int point) {
            this.point = point;
            this.content = content+(point>=0?" +":" -")+String.valueOf(point);
        }
    }
    User user;
    ExpType expType;
    public ExpEvent(Object source,User user,ExpType expType) {
        super(source);
        this.user=user;
        this.expType=expType;
    }
}
