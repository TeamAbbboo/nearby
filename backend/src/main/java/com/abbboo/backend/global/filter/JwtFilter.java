package com.abbboo.backend.global.filter;

import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.auth.OAuth2UserDto;
import com.abbboo.backend.global.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 스웨거 경로를 확인하고 필터 적용을 건너뛰기
        if (request.getRequestURI().startsWith("/api/swagger-ui") ||
                request.getRequestURI().startsWith("/api/v3/api-docs")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 헤더에서 Authorization 조회
        String authorization = request.getHeader("Authorization");

        // 헤더에 Authorization 없거나, 시작이 Bearer 아닌 경우
        if (authorization == null || !authorization.startsWith("Bearer ")) {

            log.info("토큰이 없습니다.");
            filterChain.doFilter(request, response);
            return;
        }

        // 순수 토큰 문자열 가져오기
        String token = authorization.split(" ")[1];

        log.info("토큰 검증 수행 : START");

        // 토큰 검증 수행
        if(!jwtUtil.validateToken(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        log.info("토큰 검증 수행 : COMPLETE");

        // 토큰에서 createdId 확인
        String createdUserId = jwtUtil.getCreatedUserId(token);

        // OAuth2UserDto 생성
        OAuth2UserDto oAuth2UserDto = OAuth2UserDto.builder()
                .createdUserId(createdUserId)
                .build();

        // UserDetails에 회원 정보 객체 담기
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(oAuth2UserDto);

        // 스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());

        // 세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}