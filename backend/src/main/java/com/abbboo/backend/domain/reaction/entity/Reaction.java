package com.abbboo.backend.domain.reaction.entity;

import com.abbboo.backend.domain.story.entity.Story;
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
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "reaction")
public class Reaction extends BaseEntity { // 반응

    @Column(name = "reaction_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 반응이 달린 소식
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "story_id")
    private Story story;

    // 반응한 사용자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 반응 내용
    @Column(name = "action", length = 10)
    private String action;

}
