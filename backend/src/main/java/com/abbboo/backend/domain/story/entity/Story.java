package com.abbboo.backend.domain.story.entity;

import com.abbboo.backend.domain.reaction.entity.Reaction;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "story")
public class Story extends BaseEntity { // 소식

    @Column(name = "story_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 소식 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 업로드 파일 S3 url
    @Column(name = "url", nullable = false, length = 2000)
    private String url;

    // 보관 여부
    @Column(name = "saved")
    @ColumnDefault("false")
    private Boolean saved;

    // 소식에 달린 반응
    @OneToMany(mappedBy = "story")
    private List<Reaction> reactions = new ArrayList<>();

}
