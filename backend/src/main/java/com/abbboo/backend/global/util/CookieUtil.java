package com.abbboo.backend.global.util;

import jakarta.servlet.http.Cookie;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CookieUtil {

    // 쿠키 생성 메서드
    public Cookie createCookie(String key, String value) {

        // 쿠키 객체 생성
        Cookie cookie = new Cookie(key, value);

        // 쿠키 만료 시간 설정
        cookie.setMaxAge(1000*60*60*24);

        // https 환경에서만 사용가능하도록 설정
        //cookie.setSecure(true);

        // 쿠키가 보일 위치 설정
        cookie.setPath("/");

        // 브라우저에서 JS 접근 불가하도록 설정
        cookie.setHttpOnly(true);

        return cookie;
    }
}
