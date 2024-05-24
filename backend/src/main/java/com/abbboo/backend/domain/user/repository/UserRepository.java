package com.abbboo.backend.domain.user.repository;

import com.abbboo.backend.domain.family.dto.res.FamilyInfoRes;
import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.user.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> , UserRepositoryQuerydsl{


    // 카카오 아이디로 유저 찾기
    Optional<User> findByKakaoId(String kakaoId);
    //가족 구성원 수 구하기
    Integer countByFamilyAndIsDeletedFalse(Family family);

    // 가족 구성원의 정보 가져오기
    @Query("select new com.abbboo.backend.domain.family.dto.res.FamilyInfoRes(" +
            "u.id, u.nickname, u.birthday, u.mood, u.decoration)" +
            "from User u where u.family.id= :familyId and u.isDeleted=false")
    List<FamilyInfoRes> findByFamilyId(@Param("familyId") Optional<Integer> familyId);
}
