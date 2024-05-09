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

//이벤트를 발생시켰을 시에 eventlistner가 공통적으로 처리
@Component
@RequiredArgsConstructor
@Slf4j
public class ExpEventListener implements ApplicationListener<ExpEvent> {
    private final ExpHistoryRepository expHistoryRepository;
    @Override
    public void onApplicationEvent(ExpEvent event) {
        log.info("경험치 생성 user: {} ,ExpType: {}",event.user.getId(),event.expType.content);
        if(event.user.getFamily()==null)
        {
            throw new NotFoundException(ErrorCode.FAMILY_NOT_FOUND);
        }

        ExpHistory expHistory=ExpHistory.builder()
                    .user(event.user).level(event.user.getFamily().getLevel()).point(event.expType.point).content(event.expType.content)
                    .build();
            expHistoryRepository.save(expHistory);

    }

}