package com.abbboo.backend.global.auth;

// 소셜 로그인 응답 인터페이스
public interface OAuth2Response {

    // 등록 서비스 제공자
    String getProvider();

    // 서비스 아이디
    String getProviderId();
}
