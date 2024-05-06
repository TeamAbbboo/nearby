package com.abbboo.backend.domain.user.service;

import com.abbboo.backend.domain.user.dto.req.UserModifyReq;
import com.abbboo.backend.domain.user.dto.req.UserRegistReq;
import com.abbboo.backend.domain.user.dto.res.UserCheckRes;
import com.abbboo.backend.domain.user.dto.res.UserLoginRes;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // 유저 정보 조회
    @Override
    public UserCheckRes getUserMe(String kakaoId) {

        // 유저 조회
        User user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 유저 정보 조회 응답 반환
        return UserCheckRes.builder()
                .nickname(user.getNickname())
                .birthday(user.getBirthday())
                .build();
    }

    // 유저 정보 수정
    @Override
    @Transactional
    public void updateUser(String kakaoId, UserModifyReq userModifyReq) {

        // 유저 조회
        User user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 유저 닉네임 변경
        user.changeNickname(userModifyReq.getNickname());
    }

    // 유저 정보 등록
    @Override
    @Transactional
    public void updateUserAll(String kakaoId, UserRegistReq userRegistReq) {

        // 유저 조회
        User user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 정보 등록 메서드
        user.changeAll(userRegistReq.getNickname(), userRegistReq.getBirthday());
    }
      
    // 유저 로그인
    @Override
    public UserLoginRes getUserAll(String kakaoId) {

        // 유저 조회
        userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 유저 정보 응답 반환
        return userRepository.findByUserAll(kakaoId);
    }
}