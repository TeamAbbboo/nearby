package com.abbboo.backend.domain.family.entity;

import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.global.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "family")
public class Family extends BaseEntity { // 가족 그룹 정보

    @Column(name = "family_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 가족 코드
    @Column(name = "family_code", nullable = false)
    private String familyCode;

    // 가족 구성원
    @OneToMany(mappedBy = "family")
    private List<User> familyMember = new ArrayList<>();

    // 현재 가족 민들레 레벨
    @Column(name = "level")
    @ColumnDefault("1")
    private Integer level;

    @Builder
    public Family(String familyCode) {
        this.familyCode = familyCode;
    }
}
