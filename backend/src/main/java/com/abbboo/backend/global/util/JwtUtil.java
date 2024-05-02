package com.abbboo.backend.global.util;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // 키를 저장할 객체
    private SecretKey secretKey;

    // secret 값을 가져와 키 생성
    public JwtUtil(@Value("${jwt.secret}")String secret) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    // ID 확인
    public String getCreatedId(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("createdId", String.class);
    }

    // 만료 여부 확인
    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
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
}
