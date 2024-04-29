package com.abbboo.backend.domain.expHistory.entity;

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
@Table(name = "exp_history")
public class ExpHistory extends BaseEntity { // 경험치 내역

    @Column(name = "exp_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 경험치를 올린 사용자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 경험치 증가 시점의 가족 레벨 (경험치는 해당 레벨에만 반영됨)
    @Column(name = "level", nullable = false)
    private Integer level;

    // 증가 또는 감소한 경험치량
    @Column(name = "point", nullable = false)
    private Integer point;

    // 상세 내역 (예시. 메시지 작성으로 +10)
    @Column(name = "content", length = 50, nullable = false)
    private String content;

}
