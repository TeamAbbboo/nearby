package com.abbboo.backend.global.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CookieUtil {

    // 쿠키 생성 메서드
    public Cookie createCookie(String key, String value, int expiredTime) {

        // 쿠키 객체 생성
        Cookie cookie = new Cookie(key, value);

        // 쿠키 만료 시간 설정
        cookie.setMaxAge(expiredTime);

        // https 환경에서만 사용가능하도록 설정
        //cookie.setSecure(true);

        // 쿠키가 보일 위치 설정
        cookie.setPath("/");

        // 브라우저에서 JS 접근 불가하도록 설정
        cookie.setHttpOnly(true);

        return cookie;
    }

    // 쿠키에서 토큰 확인 메서드
    public String getCookieToken(HttpServletRequest request) {

        // 쿠기 가져오기
        Cookie[] cookies = request.getCookies();

        // 쿠키가 존재할 경우
        if(cookies != null) {
            for(Cookie cookie : cookies) {

                // 쿠키 키가 refreshToken 경우
                if (cookie.getName().equals("refreshToken")) {
                    request.setAttribute("refreshToken",cookie.getValue());
                    return cookie.getValue();
                }
            }
        }

        return null;
    }
}
