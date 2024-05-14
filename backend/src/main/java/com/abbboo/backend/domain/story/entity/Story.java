package com.abbboo.backend.domain.story.entity;

import com.abbboo.backend.domain.family.entity.Family;
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
@Table(name = "story")
public class Story extends BaseEntity { // 소식

    @Column(name = "story_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 소식 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 업로드 파일 S3 url - frontFile
    @Column(name = "front_url", nullable = false, length = 2000)
    private String frontUrl;

    // 업로드 파일 S3 url - rearFile
    @Column(name = "rear_url", nullable = false, length = 2000)
    private String rearUrl;

    // 보관 여부
    @Column(name = "is_saved")
    @ColumnDefault("false")
    private Boolean isSaved = false;

    // 가족 id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id", nullable = false)
    private Family family;

    // 소식에 달린 반응
    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    private List<ReactionHistory> reactions = new ArrayList<>();

    public void changeIsSaved(){
        this.isSaved = !isSaved;
    }
}
