package com.abbboo.backend.global.auth;

import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

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

        // 리소스 서버에서 발급받은 정보로 사용자 아이디 생성
        String createdUserId = oAuth2Response.getProvider()+"-"+oAuth2Response.getProviderId();

        log.info("사용자 아이디 생성 : OK");

        // 생성된 값 이미 존재하는지 확인
        User existData = userRepository.findByKakaoId(createdUserId);

        // 존재하지 않는 경우
        if(existData == null) {

            log.info("존재하지 않는 아이디로 유저를 생성 : OK");
            
            // 유저 생성
            User user = User.builder()
                    .kakaoId(createdUserId)
                    .build();

            userRepository.save(user);
        }

        // OAuth2User 인자 객체 생성
        OAuth2UserDto oAuth2UserDto = OAuth2UserDto.builder()
                .createdUserId(createdUserId)
                .build();

        log.info("Authentication Provider 전달 객체 생성 : OK");

        // Authentication Provider 전달 객체 생성 후 반환
        return new CustomOAuth2User(oAuth2UserDto);
    }
}