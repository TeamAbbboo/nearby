package com.abbboo.backend.domain.user.repository;

import com.abbboo.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {


    // 카카오 아이디로 유저 찾기
    User findByKakaoId(String kakaoId);
}