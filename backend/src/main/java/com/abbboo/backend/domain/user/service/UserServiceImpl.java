package com.abbboo.backend.domain.user.service;

import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.family.repository.FamilyRepository;
import com.abbboo.backend.domain.user.dto.req.UserEnrollFamilyReq;
import com.abbboo.backend.domain.user.dto.req.UserModifyReq;
import com.abbboo.backend.domain.user.dto.req.UserRegistReq;
import com.abbboo.backend.domain.user.dto.res.UserCheckRes;
import com.abbboo.backend.domain.user.dto.res.UserEnrollFamilyRes;
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
    private final FamilyRepository familyRepository;

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

    // 유저 가족 등록
    @Override
    @Transactional
    public UserEnrollFamilyRes updateUserFamily(String kakaoId, UserEnrollFamilyReq userEnrollFamilyReq) {

        // 유저 조회
        User user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 가족 코드로 가족 조회
        Family family = familyRepository.findByFamilyCode(userEnrollFamilyReq.getFamilyCode())
                .orElseThrow(() -> new NotFoundException(ErrorCode.FAMILY_NOT_FOUND));
        
        // 유저 가족 등록
        user.changeFamily(family);

        // 유저 가족 등록 응답 반환
        return UserEnrollFamilyRes.builder()
                .familyId(user.getFamily().getId())
                .build();
    }

    // 유저 가족 떠나기
    @Override
    @Transactional
    public void deleteUserFamily(String kakaoId) {

        // 유저 조회
        User user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 가족이 이미 없는 경우
        if(user.getFamily()==null) {
            throw new NotFoundException(ErrorCode.FAMILY_NOT_FOUND);
        }

        // 유저 가족 정보 삭제
        user.deleteFamily();
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
