package com.abbboo.backend.global.error;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

// 인증에 대한 예외 처리
@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        log.info("인증에 대한 예외 발생 : OK");

        // 에러 정보 가져오기
        ErrorCode errorCode = (ErrorCode) request.getAttribute("exception");

        // 예외 종류 로그 출력
        log.info("예외 내용 : {}",errorCode.getMessage());

        // 응답 생성
        response.setStatus(errorCode.getStatus());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        ErrorResponse errorResponse = new ErrorResponse(
                errorCode.getStatus(), errorCode.getMessage(), errorCode.getCode(), "");
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }
}
