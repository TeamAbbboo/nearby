package com.abbboo.backend.domain.message.entity;

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
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@Builder
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "message")
public class Message extends BaseEntity { // 쪽지

    @Column(name = "message_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 수신인
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    // 발신인
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    // 쪽지 읽음 여부
    @Column(name = "is_read")
    @ColumnDefault("false")
    private Boolean isRead;

    // 쪽지 내용
    @Column(name = "content", length = 100, nullable = false)
    private String content;

    // tts 파일 저장 url
    @Column(name = "tts_url", length = 2000, nullable = false)
    private String ttsUrl;

    // 자동 메시지 여부
    @Column(name = "is_auto")
    @ColumnDefault("false")
    private Boolean isAuto;

    public void changeIsRead(){
        this.isRead = true;
    }
}
