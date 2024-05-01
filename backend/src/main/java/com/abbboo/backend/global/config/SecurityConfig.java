package com.abbboo.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // CSRF 설정
        http
                // CSRF 공격 방어 메서드 비활성화
                // -> JWT 발급에서 stateless 상태로 세션을 관리하기 때문에 비활성화
                .csrf((auth) -> auth.disable());

        // FORM 로그인 방식 설정
        http
                // FORM 로그인 방식 비활성화
                // -> JWT 방식, OAuth2 방식의 로그인을 수행하므로 비활성화
                .formLogin((auth) -> auth.disable());

        // HTTP Basic 인증 방식 설정
        http
                // HTTP Basic 인증 방식 비활성화
                // -> JWT 방식, OAuth2 방식의 로그인을 수행하므로 비활성화
                .httpBasic((auth) -> auth.disable());

        // OAuth2 설정
        http
                // OAuth2 기본 설정 적용
                .oauth2Login(Customizer.withDefaults());

        // 경로별 인가 작업
        http
                .authorizeHttpRequests((auth) -> auth

                        // ROOT 경로 모든 접근 허용 설정
                        .requestMatchers("/").permitAll()

                        // 이외 인증된 Client 접근 허용
                        .anyRequest().authenticated());

        // 세션 설정
        http
                .sessionManagement((session) -> session

                        // STATELESS 설정
                        // -> JWT 통해 인증, 인가를 수행하기 때문에 세션 비연결성으로 설정
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}