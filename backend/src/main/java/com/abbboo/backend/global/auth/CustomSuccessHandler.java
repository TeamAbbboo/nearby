package com.abbboo.backend.global.auth;

import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.NotFoundException;
import com.abbboo.backend.global.util.CookieUtil;
import com.abbboo.backend.global.util.JwtUtil;
import jakarta.servlet.ServletException;
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
    private final CookieUtil cookieUtil;

    // 토큰 시간 정의
    private final static int ACCESS_TOKEN_SECONDS = 1000*60*24*3*60;
    private final static int REFRESH_TOKEN_SECONDS = 1000*60*60*24*24;

    @Value("${spring.security.oauth2.redirect.url.full}")
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

        // 토큰 발행 (3일, 24일)
        String accessToken = jwtUtil.createJwt(createdUserId, ACCESS_TOKEN_SECONDS);
        String refreshToken = jwtUtil.createJwt(createdUserId, REFRESH_TOKEN_SECONDS);

        log.info("토큰 발행 : COMPLETE");

        User user = userRepository.findByKakaoId(createdUserId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        user.changeRefreshToken(refreshToken);
        userRepository.save(user);

        log.info("응답 생성 : START");
        
        // 리프레쉬 토큰 쿠키에 추가
        response.addCookie(cookieUtil.createCookie("refreshToken", refreshToken, REFRESH_TOKEN_SECONDS));
        response.sendRedirect(sendRedirectUrl+"?token="+accessToken);

        log.info("응답 생성 : COMPLETE");
    }
}