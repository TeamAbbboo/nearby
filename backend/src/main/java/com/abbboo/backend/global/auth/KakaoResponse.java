package com.abbboo.backend.global.auth;

import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
public class KakaoResponse implements OAuth2Response {

    // 로그인 후 받은 유저 정보
    private final Map<String, Object> attribute;

    // 등록 서비스 제공자
    @Override
    public String getProvider() {
        return "kakao";
    }

    // 서비스 아이디
    @Override
    public String getProviderId() {
        return attribute.get("id").toString();
    }
}
