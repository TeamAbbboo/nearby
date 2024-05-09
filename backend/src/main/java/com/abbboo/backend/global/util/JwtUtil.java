package com.abbboo.backend.global.util;

import com.abbboo.backend.global.error.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SecurityException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    // 키를 저장할 객체
    private SecretKey secretKey;

    // secret 값을 가져와 키 생성
    public JwtUtil(@Value("${jwt.secret}")String secret) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    // ID 확인
    public String getCreatedUserId(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("createdUserId", String.class);
    }

    // JWT 생성
    public String createJwt(String createdUserId, Long expiredMs) {
        return Jwts.builder()

                // ID 정보
                .claim("createdUserId", createdUserId)

                // 발행 시간
                .issuedAt(new Date(System.currentTimeMillis()))

                // 만료 시간
                .expiration(new Date(System.currentTimeMillis()+expiredMs))

                // 서명
                .signWith(secretKey)
                .compact();
    }

    // JWT 검증
    public boolean validateToken(HttpServletRequest request, String token) {

        try {

            Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;

        } catch (SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
            request.setAttribute("exception", ErrorCode.TOKEN_SIGNATURE_IS_WRONG);

        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
            request.setAttribute("exception", ErrorCode.TOKEN_IS_EXPIRED);

        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰 입니다.");
            request.setAttribute("exception", ErrorCode.TOKEN_IS_NOT_SUPPORTED);

        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
            request.setAttribute("exception", ErrorCode.TOKEN_IS_WRONG);

        } catch (Exception e){
            log.info("검증 시도 중 에러 발생");
            request.setAttribute("exception", ErrorCode.TOKEN_VERIFICATION_FAIL);

        }

        return false;
    }
}
