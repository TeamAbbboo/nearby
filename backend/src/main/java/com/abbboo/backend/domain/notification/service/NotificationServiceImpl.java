package com.abbboo.backend.domain.notification.service;

import com.abbboo.backend.domain.notification.dto.req.NotificationPokeActionReq;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.NotFoundException;
import com.abbboo.backend.global.event.NotificationEventFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    // 꾸욱 누르기
    @Override
    @Transactional
    public void createPokeAction(String kakaoId, NotificationPokeActionReq notificationPokeActionReq) {

        // 유저 조회
        User sender = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 상대 유저 조회
        User receiver = userRepository.findById(notificationPokeActionReq.getReceiverId())
                        .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        log.info("꾸욱 누른 유저 ID : {} -> 찌름 당한 유저 ID : {}",sender.getId(),receiver.getId());

        // 꾸욱 누르기 이벤트 알림 발생
        eventPublisher.publishEvent(NotificationEventFactory.createPokeEvent(this,sender,receiver));
    }
}