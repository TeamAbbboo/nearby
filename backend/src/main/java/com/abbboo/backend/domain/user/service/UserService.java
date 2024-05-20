package com.abbboo.backend.domain.user.service;

import com.abbboo.backend.domain.user.dto.req.UserEnrollFamilyReq;
import com.abbboo.backend.domain.user.dto.req.UserLoginReq;
import com.abbboo.backend.domain.user.dto.req.UserModifyReq;
import com.abbboo.backend.domain.user.dto.req.UserRegistReq;
import com.abbboo.backend.domain.user.dto.res.UserCheckRes;
import com.abbboo.backend.domain.user.dto.res.UserEnrollFamilyRes;
import com.abbboo.backend.domain.user.dto.res.UserLoginRes;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {

    // 유저 정보 조회
    UserCheckRes getUserMe(String kakaoId);

    // 유저 정보 수정
    void updateUser(String kakaoId, UserModifyReq userModifyReq);

    // 유저 가족 등록
    UserEnrollFamilyRes updateUserFamily(String kakaoId, UserEnrollFamilyReq userEnrollFamilyReq);

    // 유저 가족 떠나기
    void deleteUserFamily(String kakaoId);

    // 유저 정보 등록
    void updateUserAll(String kakaoId, UserRegistReq userRegistReq);

    // 유저 탈퇴
    void deleteUser(String kakaoId);

    // 유저 로그인
    UserLoginRes getUserAll(String kakaoId, UserLoginReq userLoginReq);

    // 유저 로그아웃
    void deleteUserState(String kakaoId, HttpServletResponse response);

    // 유저 토큰 재발급
    void createUserToken(HttpServletRequest request, HttpServletResponse response);

}
