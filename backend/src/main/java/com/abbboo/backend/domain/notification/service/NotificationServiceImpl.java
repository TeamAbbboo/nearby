package com.abbboo.backend.domain.notification.service;

import com.abbboo.backend.domain.notification.dto.req.NotificationPokeActionReq;
import com.abbboo.backend.domain.notification.dto.res.ReceivedNotificationRes;
import com.abbboo.backend.domain.notification.entity.Notification;
import com.abbboo.backend.domain.notification.repository.NotificationRepository;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.base.PagenationReq;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.NotFoundException;
import com.abbboo.backend.global.event.NotificationEventFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    // 전체 알림 내역 조회
    @Override
    @Transactional
    public Slice<ReceivedNotificationRes> findReceivedNotification(String kakaoId, PagenationReq pagenationReq) {

        // 유저 조회
        User receiver = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        log.info("유저 ID : {}", receiver.getId());

        // 페이징 객체 생성
        PageRequest pageRequest = PageRequest.of(
                pagenationReq.getPage(), pagenationReq.getSize(),
                Sort.by(Sort.Direction.DESC, "createdAt"));

        log.info("알림 내역 페이징 객체 생성 : OK");

        // 범위만큼 알림 내역 조회
        Slice<ReceivedNotificationRes> receivedNotifications =
                notificationRepository.findReceivedNotification(receiver.getId(), pageRequest);

        log.info("범위만큼 알림 내역 불러오기 : OK");

        // 안 읽은 알림 찾기
        List<Notification> notifications = receiver.getReceivedNotifications()
                .stream()
                .filter(notification -> !notification.getIsRead())
                .toList();

        log.info("읽지 않은 알림 내역 불러오기 : OK");

        // 안 읽은 알림 읽음 처리
        for (ReceivedNotificationRes n : receivedNotifications){

            // isRead == false -> true
            if(!n.getIsRead()){
                for(Notification notification : notifications){
                    if(notification.getId() == n.getNotificationId()){
                        notification.changeIsRead();
                    }
                }
            }
        }

        log.info("알림 읽음 처리 : OK");
        
        return receivedNotifications;
    }

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