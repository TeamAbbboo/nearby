package com.abbboo.backend.domain.family.repository;

import com.abbboo.backend.domain.family.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import java.util.Optional;

public interface FamilyRepository extends JpaRepository<Family, Integer> {

    // 가족 코드 중복 여부 검사
    Boolean existsByFamilyCode(String createdFamilyCode);

    // 카카오아이디로 본인 가족 id 얻기
    @Query("select f.id from Family f join User u on u.family.id=f.id where u.kakaoId= :kakaoId")
    Optional<Integer> findByKakaoId(@Param("kakaoId") String kakaoId);
    
    // 가족 코드로 가족 엔티티 조회
    Optional<Family> findByFamilyCode(String familyCode);
}
