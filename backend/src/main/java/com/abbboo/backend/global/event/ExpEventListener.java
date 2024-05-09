package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.expHistory.entity.ExpHistory;
import com.abbboo.backend.domain.expHistory.repository.ExpHistoryRepository;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

//이벤트를 발생시켰을 시에 eventlistner가 공통적으로 처리
@Component
@RequiredArgsConstructor
@Slf4j
public class ExpEventListener implements ApplicationListener<ExpEvent> {
    private final ExpHistoryRepository expHistoryRepository;

    @Override
    public void onApplicationEvent(ExpEvent event) {
        log.info("경험치 생성 user: {} ,ExpType: {}", event.user.getId(), event.expType.content);
        if (event.user.getFamily() == null) {
            throw new NotFoundException(ErrorCode.FAMILY_NOT_FOUND);
        }
        //일일 로그인은 당일 기록이 있을 경우 등록안함
        if (event.expType == ExpEvent.ExpType.DAILY_LOGIN) {
            if (expHistoryRepository.existsByUserAndCreatedAtBetweenAndContentLike(event.user, LocalDate.now().atStartOfDay(), LocalDateTime.now(), "%로그인%")) {
                log.info("이미 일일 로그인 완료");
                return;
            }
        }
        ExpHistory expHistory = ExpHistory.builder()
                .user(event.user).level(event.user.getFamily().getLevel()).point(event.expType.point).content(event.expType.content)
                .build();
        expHistoryRepository.save(expHistory);

    }

}