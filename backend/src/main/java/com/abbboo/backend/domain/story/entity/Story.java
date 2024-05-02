package com.abbboo.backend.domain.story.entity;

import com.abbboo.backend.domain.reaction.entity.ReactionHistory;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.global.base.BaseEntity;
import jakarta.persistence.CascadeType;
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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
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
    @Column(name = "is_saved")
    @ColumnDefault("false")
    private Boolean isSaved;

    // 소식에 달린 반응
    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    private List<ReactionHistory> reactions = new ArrayList<>();


    @Builder
    public Story(User user, String url) {
        this.user = user;
        this.url = url;
    }

    public void changeIsSaved(){
        this.isSaved = !isSaved;
    }
}
