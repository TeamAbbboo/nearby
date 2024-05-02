package com.abbboo.backend.global.auth;

import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Value("${spring.security.oauth2.redirect.url}")
    private String sendRedirectUrl;

    @SneakyThrows
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        log.info("OAuth2 로그인 성공 : OK");

        // 유저 정보 가져오기
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        // 유저 ID 정보
        String createdUserId = customUserDetails.getCreatedUserId();

        log.info("토큰 발행 : START");

        // 토큰 발행 (1시간, 24시간)
        String accessToken = jwtUtil.createJwt(createdUserId, 1000*60*60L);
        String refreshToken = jwtUtil.createJwt(createdUserId, 1000*60*60*24L);

        log.info("토큰 발행 : COMPLETE");

        User user = userRepository.findByKakaoId(createdUserId);
        user.changeRefreshToken(refreshToken);
        userRepository.save(user);

        log.info("응답 생성 : START");
        
        // 리프레쉬 토큰 쿠키에 추가
        response.addCookie(createCookie("refreshToken", refreshToken));
        response.sendRedirect(sendRedirectUrl+"?token="+accessToken);

        log.info("응답 생성 : COMPLETE");
    }

    // 쿠키 생성 메서드
    private Cookie createCookie(String key, String value) {

        // 쿠키 객체 생성
        Cookie cookie = new Cookie(key, value);

        // 쿠키 만료 시간 설정
        cookie.setMaxAge(1000*60*60*24);

        // https 환경에서만 사용가능하도록 설정
        //cookie.setSecure(true);

        // 쿠키가 보일 위치 설정
        cookie.setPath("/");

        // 브라우저에서 JS 접근 불가하도록 설정
        cookie.setHttpOnly(true);

        return cookie;
    }
}