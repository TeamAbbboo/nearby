package com.abbboo.backend.domain.decoration.entity;

import com.abbboo.backend.global.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "decoration")
public class Decoration extends BaseEntity { // 펭귄 꾸미기 아이템

    @Column(name = "decoration_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 아이템 정보
    @Column(name = "expression", length = 20)
    private String expression;

    // 삭제 여부
    @Column(name = "is_deleted")
    @ColumnDefault("false")
    private Boolean isDeleted;
}
