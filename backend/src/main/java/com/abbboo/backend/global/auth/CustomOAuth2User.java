package com.abbboo.backend.global.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final OAuth2UserDto oAuth2UserDto;

    // 사용자 정보 반환
    // -> 소셜 프로바이더마다 데이터 형식이 달라 획일화 구현 불가
    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    // 사용자 권한 반환
    // -> 해당 서비스 권한 없음
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    // 사용자 이름
    // -> 해당 서비스 이름 없음
    @Override
    public String getName() {
        return null;
    }

    // 사용자 아이디
    public String getCreatedUserId() {
        return oAuth2UserDto.getCreatedUserId();
    }
}
