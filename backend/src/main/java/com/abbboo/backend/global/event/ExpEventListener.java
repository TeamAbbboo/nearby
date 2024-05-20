package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.expHistory.entity.ExpHistory;
import com.abbboo.backend.domain.expHistory.repository.ExpHistoryRepository;
import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.family.repository.FamilyRepository;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
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
    private final UserRepository userRepository;
    private final FamilyRepository familyRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Value("${notification.auto.user}")
    private String notificationAutoUser;

    @Override
    public void onApplicationEvent(ExpEvent event) {
        log.info("경험치 생성 user: {} ,ExpType: {}", event.user.getId(), event.expType.content);
        if (event.user.getFamily() == null) {
            log.error("가족없어서 경험치 적용안됨");
            return;
        }
        //일일 로그인은 당일 기록이 있을 경우 등록안함
        if (event.expType == ExpEvent.ExpType.DAILY_LOGIN) {
            if (expHistoryRepository.existsByUserAndCreatedAtBetweenAndContentLike(event.user, LocalDate.now().atStartOfDay(), LocalDateTime.now(), "%로그인%")) {
                log.error("이미 일일 로그인 완료");
                return;
            }
        }
        ExpHistory expHistory = ExpHistory.builder()
                .user(event.user).level(event.user.getFamily().getLevel()).point(event.expType.point).content(event.expType.content).family(event.user.getFamily())
                .build();
        expHistoryRepository.save(expHistory);

        // 이벤트 이후 경험치 확인
        int familyId=familyRepository.findByKakaoId(event.user.getKakaoId())
                .orElseThrow(()->new NotFoundException(ErrorCode.FAMILY_NOT_FOUND));
        
        Family family = familyRepository.findById(familyId).get();
        
        // 레벨 업 가능한지 확인
        int sum = expHistoryRepository.getCurrentSum(familyId).orElse(0);
        int familyCount = userRepository.countByFamilyAndIsDeletedFalse(family);
        
        // 레벨 업 가능한 경험치일 경우
        if(sum>=getMaxExp(family.getLevel(),familyCount)) {

            // 레벨 업 버튼 활성화 이벤트 발생
            User auto = userRepository.findById(Integer.valueOf(notificationAutoUser)).get();
            eventPublisher.publishEvent(NotificationEventFactory.createLevelUpButtonActiveEvent(this,auto,family));
        }
    }

    // 해당 채워야하는 경험치 조회
    private int getMaxExp(int level,int familyCount)
    {
        return familyCount*10*(int)Math.pow(2,level-1);
    }
}