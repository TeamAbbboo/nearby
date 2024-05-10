package com.abbboo.backend.global.filter;

import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.auth.OAuth2UserDto;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.util.CookieUtil;
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
    private final CookieUtil cookieUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 스웨거 경로를 확인하고 필터 적용을 건너뛰기
        if (request.getRequestURI().startsWith("/api/swagger-ui") ||
                request.getRequestURI().startsWith("/api/v3/api-docs")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 접근 경로에 따른 토큰 확인 위치 분기
        String authorization;
        String token;

        // 재발급 요청인 경우
        if(request.getRequestURI().startsWith("/api/users/reissue")) {
            
            // 쿠키에서 토큰 확인
            authorization = cookieUtil.getCookieToken(request);

            // 쿠키에 refreshToken 없는 경우
            if(authorization == null) {
                log.info("쿠키가 없습니다.");
                request.setAttribute("exception", ErrorCode.TOKEN_NOT_FOUND);
                filterChain.doFilter(request, response);
                return;
            }

            // 순수 토큰 문자열 가져오기
            token = authorization;
        }

        // 일반 요청인 경우
        else {
            
            // 헤더에서 토큰 확인
            authorization = request.getHeader("Authorization");

            // 헤더에 Authorization 없거나, 시작이 Bearer 아닌 경우
            if (authorization == null || !authorization.startsWith("Bearer ")) {

                log.info("토큰이 없습니다.");
                request.setAttribute("exception", ErrorCode.TOKEN_NOT_FOUND);
                filterChain.doFilter(request, response);
                return;
            }

            // 순수 토큰 문자열 가져오기
            token = authorization.split(" ")[1];
        }

        log.info("토큰 검증 수행 : START");

        // 토큰 검증 수행
        if(!jwtUtil.validateToken(request, token)) {
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