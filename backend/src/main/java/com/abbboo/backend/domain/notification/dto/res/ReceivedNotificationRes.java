package com.abbboo.backend.domain.notification.dto.res;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReceivedNotificationRes {

    private long notificationId;         // 알림 식별 ID
    private int senderId;                // 발신자 식별 ID
    private String nickname;             // 발신자 닉네임
    private String mood;                 // 발신자 상태
    private String title;                // 알림 제목
    private String content;              // 알림 내용
    private LocalDateTime createdAt;     // 알림 수신 일자
    private Boolean isRead;              // 알림 읽음 여부

    @Builder
    public ReceivedNotificationRes(long notificationId, int senderId, String nickname, String mood, String title,
                                   String content, LocalDateTime createdAt, Boolean isRead) {
        this.notificationId = notificationId;
        this.senderId = senderId;
        this.nickname = nickname;
        this.mood = mood;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.isRead = isRead;
    }
}