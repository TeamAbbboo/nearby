package com.abbboo.backend.domain.mood.entity;

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
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "mood_history")
public class MoodHistory extends BaseEntity { // 사용자의 기분 상태 등록 내역

    @Column(name = "mood_history_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 상태를 등록한 사용자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 등록한 감정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mood_id")
    private Mood mood;

}
