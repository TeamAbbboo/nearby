package com.abbboo.backend.domain.family.repository;

import com.abbboo.backend.domain.family.entity.Family;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface FamilyRepository extends JpaRepository<Family, Integer> {

    // 가족 코드 중복 여부 검사
    Boolean existsByFamilyCode(String createdFamilyCode);

    // 카카오아이디로 본인 가족 id 얻기
    //TODO: 가족 id를 조회보다 가족 엔티티가 더욱 범용적으로 잘 쓰일 것 같아 가족 엔티티 조회로 수정이 필요함
    @Query("select f.id from Family f join User u on u.family.id=f.id where u.kakaoId= :kakaoId")
    Optional<Integer> findByKakaoId(@Param("kakaoId") String kakaoId);
    
    // 가족 코드로 가족 엔티티 조회
    Optional<Family> findByFamilyCode(String familyCode);
}
