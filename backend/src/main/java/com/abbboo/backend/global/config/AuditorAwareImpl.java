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

        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();

        log.info("request url: {}", request.getRequestURL());
        log.info("request url: {}", request.getRemoteAddr());
        String userIp = request.getHeader("X-FORWARDED-FOR");
        if (userIp == null){
            userIp = request.getRemoteAddr();
        }

        return Optional.of(userIp);
    }
}
