package com.abbboo.backend.global.auth;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuth2UserDto {

    // 생성된 사용자 아아디
    private String createdUserId;

    @Builder
    public OAuth2UserDto(String createdUserId) {
        this.createdUserId = createdUserId;
    }
}
