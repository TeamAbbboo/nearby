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
import com.abbboo.backend.global.error.exception.BadRequestException;
import com.abbboo.backend.global.error.exception.NotFoundException;
import com.abbboo.backend.global.event.ExpEventFactory;
import com.abbboo.backend.global.util.CookieUtil;
import com.abbboo.backend.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FamilyRepository familyRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;

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

    // 유저 탈퇴
    @Override
    @Transactional
    public void deleteUser(String kakaoId) {

        // 유저 조회
        User user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        
        // 유저 정보 삭제
        user.deleteUser();
    }

    // 유저 로그인
    @Override
    @Transactional
    public UserLoginRes getUserAll(String kakaoId) {

        // 유저 조회
        User user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        eventPublisher.publishEvent(ExpEventFactory.createLoginEvent(this,user));

        // 유저 로그인 응답 반환
        return UserLoginRes.builder()
                .familyId(user.getFamily()==null
                        ? null : user.getFamily().getId())
                .nickname(user.getNickname())
                .birthday(user.getBirthday())
                .build();
    }

    // 유저 토큰 재발급
    @Override
    @Transactional
    public void createUserToken(HttpServletRequest request, HttpServletResponse response) {

        // 토큰 가져오기
        String token = (String) request.getAttribute("refreshToken");

        // 유저 조회
        User user = userRepository.findByKakaoId(jwtUtil.getCreatedUserId(token))
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        log.info("토큰 정보 - USER : {}", user.getId());

        // 저장된 토큰 비교
        if(!token.equals(user.getRefreshToken())) {
            throw new BadRequestException(ErrorCode.TOKEN_VERIFICATION_FAIL);
        }

        log.info("기존 토큰과 비교 검증 : OK");

        // 토큰 발행 (10분, 30일)
        String accessToken = jwtUtil.createJwt(jwtUtil.getCreatedUserId(token), 1000*10*60L);
        String refreshToken = jwtUtil.createJwt(jwtUtil.getCreatedUserId(token),1000*60*60*24*30L);

        log.info("액세스, 리프레쉬 토큰 재발행 : OK");

        // 리프레쉬 토큰 저장
        user.changeRefreshToken(refreshToken);

        // 응답에 토큰 추가
        response.addHeader("Authorization",accessToken);
        response.addCookie(cookieUtil.createCookie("refreshToken", refreshToken));
    }
}
