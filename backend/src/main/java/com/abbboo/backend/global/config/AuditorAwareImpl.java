package com.abbboo.backend.global.config;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.AuditorAware;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Slf4j
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public @NonNull Optional<String> getCurrentAuditor() {

        ServletRequestAttributes requestAttributes;

        try {
            requestAttributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        } catch (IllegalStateException e) {
            // 스케줄링된 작업 또는 요청 컨텍스트가 없는 다른 경우 "system" 반환
            return Optional.of("system");
        }

        HttpServletRequest request = requestAttributes.getRequest();

        log.info("request url: {}", request.getRequestURL());
        log.info("request url: {}", request.getRemoteAddr());
        String userIp = request.getHeader("X-FORWARDED-FOR");
        if (userIp == null){
            userIp = request.getRemoteAddr();
        }

        return Optional.of(userIp);
    }
}
