package com.abbboo.backend.domain.user.entity;

import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.message.entity.Message;
import com.abbboo.backend.domain.notification.entity.Notification;
import com.abbboo.backend.domain.story.entity.Story;
import com.abbboo.backend.global.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User extends BaseEntity {  // 사용자

    @Column(name = "user_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 가족 코드
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id")
    private Family family;

    // 카카오 아이디
    @Column(name = "kakao_id", unique = true)
    private String kakaoId;

    // 닉네임
    @Column(name = "nickname")
    private String nickname;

    // 생일
    @Column(name = "birthday")
    private LocalDate birthday;

    // 펭귄 상태
    @Column(name = "mood", length = 10)
    private String mood;

    // 리프레시 토큰
    @Column(name = "refresh_token")
    private String refreshToken;

    // 회원 탈퇴 여부
    @Column(name = "is_deleted")
    @ColumnDefault("false")
    @Builder.Default
    private Boolean isDeleted = false;

    // 받은 메시지 목록
    @OneToMany(mappedBy = "receiver")
    private List<Message> receivedMessages = new ArrayList<>();

    // 보낸 메시지 목록
    @OneToMany(mappedBy = "sender")
    private List<Message> sentMessages = new ArrayList<>();

    // 업로드한 소식 목록
    @OneToMany(mappedBy = "user")
    private List<Story> stories = new ArrayList<>();

    // 알림 목록
    @OneToMany(mappedBy = "user")
    private List<Notification> notifications = new ArrayList<>();

    // 토큰 갱신 메서드
    public void changeRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    // 닉네임 변경 메서드
    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    // 정보 등록 메서드
    public void changeAll(String nickname, LocalDate birthday) {
        this.nickname = nickname;
        this.birthday = birthday;
    }
}
