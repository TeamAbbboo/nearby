package com.abbboo.backend.domain.family.repository;

import com.abbboo.backend.domain.family.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyRepository extends JpaRepository<Family, Integer> {

    // 가족 코드 중복 여부 검사
    Boolean existsByFamilyCode(String createdFamilyCode);
}
