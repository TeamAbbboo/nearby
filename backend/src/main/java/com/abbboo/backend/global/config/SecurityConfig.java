package com.abbboo.backend.global.config;

import com.abbboo.backend.global.auth.CustomOAuth2UserService;
import com.abbboo.backend.global.auth.CustomSuccessHandler;
import com.abbboo.backend.global.error.CustomAccessDeniedHandler;
import com.abbboo.backend.global.error.CustomAuthenticationEntryPoint;
import com.abbboo.backend.global.filter.JwtFilter;
import com.abbboo.backend.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomSuccessHandler customSuccessHandler;
    private final JwtUtil jwtUtil;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Value("${spring.security.oauth2.redirect.url.endpoint}")
    private String sendRedirectUrl;

    @Value("${spring.security.frontend-url}")
    private String frontendUrl;

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

        // security 예외 설정
        http
                .exceptionHandling((handling) -> handling
                        .authenticationEntryPoint(customAuthenticationEntryPoint)
                        .accessDeniedHandler(customAccessDeniedHandler));

        // jwt filter 등록
        // -> UsernamePasswordAuthenticationFilter 이전에 JwtFilter 수행
        http
                .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        // OAuth2 설정
        http
                // OAuth2 로그인 후 리소스 서버에서 받은 응답을 customOAuth2UserService 전달
                .oauth2Login((oauth2) -> oauth2
                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                .userService(customOAuth2UserService))
                                .successHandler(customSuccessHandler));

        // 경로별 인가 작업
        http
                .authorizeHttpRequests((auth) -> auth

                        // Swagger 허용
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()

                        // Redirect URL 허용
                        .requestMatchers(sendRedirectUrl).permitAll()

                        // 이외 인증된 Client 접근 허용
                        .anyRequest().authenticated());

        // 세션 설정
        http
                .sessionManagement((session) -> session

                        // STATELESS 설정
                        // -> JWT 통해 인증, 인가를 수행하기 때문에 세션 비연결성으로 설정
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // CORS 설정
        http
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        // 프론트엔드 서버 주소 허용
                        configuration.setAllowedOrigins(Collections.singletonList(frontendUrl));

                        // 모든 요청 메서드 허용
                        configuration.setAllowedMethods(Collections.singletonList("*"));

                        // 브라우저가 리소스 요청을 할 때 쿠키, 인증과 관련된 HTTP 헤더 전송 허용
                        configuration.setAllowCredentials(true);

                        // 모든 요청 헤더 서버가 받아들일 수 있도록 허용
                        configuration.setAllowedHeaders(Collections.singletonList("*"));

                        // 프리플라이트 요청의 결과를 캐싱할 시간 설정
                        configuration.setMaxAge(3600L);

                        // JWT 받을 수 있도록 허용
                        configuration.setExposedHeaders(Collections.singletonList("Set-Cookie"));
                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return configuration;
                    }
                }));

        return http.build();
    }
}