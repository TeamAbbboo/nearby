package com.abbboo.backend.domain.notification.entity;

import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.global.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class Notification extends BaseEntity { // 알림
    
    @Column(name = "notification_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 알림 발신자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    // 알림 수신자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    // 알림 제목
    @Column(name = "title", nullable = false, length = 20)
    private String title;

    // 알림 내용
    @Column(name = "content", nullable = false, length = 300)
    private String content;

    // 알림 읽음 여부
    @Column(name = "is_read")
    @ColumnDefault("false")
    private Boolean isRead;

    @Builder
    public Notification(User sender, User receiver, String title, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.title = title;
        this.content = content;
    }

    // 알림 읽음 처리 메서드 
    public void changeIsRead(){
        this.isRead = true;
    }
}
