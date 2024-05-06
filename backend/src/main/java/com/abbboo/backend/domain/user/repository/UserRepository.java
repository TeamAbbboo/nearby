package com.abbboo.backend.domain.user.repository;

import com.abbboo.backend.domain.user.dto.res.UserLoginRes;
import com.abbboo.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {


    // 카카오 아이디로 유저 찾기
    Optional<User> findByKakaoId(String kakaoId);

    // 카카오 아이디로 유저의 모든 정보 조회
    @Query("select new com.abbboo.backend.domain.user.dto.res.UserLoginRes(" +
            "u.id, u.family.id, u.nickname, u.birthday, u.mood) " +
            "from User u where u.kakaoId= :kakaoId")
    UserLoginRes findByUserAll(@Param("kakaoId") String kakaoId);
}
