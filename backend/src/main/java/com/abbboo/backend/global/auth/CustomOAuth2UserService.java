package com.abbboo.backend.global.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        log.info("리소스 서버 유저 정보 획득 : OK");

        // 유저 정보 획득
        OAuth2User oAuth2User = super.loadUser(userRequest);

        log.info("리소스 서버 유저 정보 : {}", oAuth2User.getAttributes().toString());

        // 등록 서비스 조회
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // 소셜 로그인 응답 인터페이스 생성
        OAuth2Response oAuth2Response = null;

        // 등록 서비스가 카카오인 경우
        if(registrationId.equals("kakao")) {

            log.info("등록 서비스 : 카카오");

            // 소셜 로그인 응답 카카오 구현체
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        }

        // 이외 경우
        else {

            return null;
        }

        return oAuth2User;
    }
}