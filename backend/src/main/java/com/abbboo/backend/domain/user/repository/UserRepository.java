package com.abbboo.backend.domain.user.repository;

import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {


    // 카카오 아이디로 유저 찾기
    Optional<User> findByKakaoId(String kakaoId);
    //가족 구성원 수 구하기
    Integer countByFamilyAndIsDeletedFalse(Family family);
}
