package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.notification.entity.Notification;
import com.abbboo.backend.domain.notification.repository.NotificationRepository;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.BadRequestException;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.MulticastMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

// 다건 - 이벤트를 발생시켰을 시에 eventlistner가 공통적으로 처리
@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationMultipleEventListener implements ApplicationListener<NotificationMultipleEvent> {

    private final NotificationRepository notificationRepository;
    private final FirebaseMessaging firebaseMessaging;

    @Override
    public void onApplicationEvent(NotificationMultipleEvent event) {

        // FCM 토큰 저장 리스트
        List<String> fcmTokens = new ArrayList<>();

        // 가족 구성원 중 실사용자 조회
        List<User> activeUsers = event.getFamily().getFamilyMember().stream()
                .filter(user -> !user.getIsDeleted() && !user.getId().equals(event.getSender().getId()))
                .toList();

        try {


            // 가족 구성원 순회
            for (User user : activeUsers) {

                // 알림 이력 저장
                Notification notification = Notification.builder()
                        .user(user)
                        .title(event.getSender().getNickname() + "펭귄")
                        .content(event.getNotificationEventType().getMessage())
                        .build();

                // FCM 토큰 리스트 추가
                fcmTokens.add(user.getFcmToken());

                notificationRepository.save(notification);

                log.info("알림 이력 저장 : OK");
            }

            // 알림 보내기
            sendMultipleNotification(fcmTokens, event);

            log.info("알림 보내기 : OK");

        } catch (FirebaseMessagingException e) {
            log.info("다건 알림 보내기 실패 : FAIL");
            throw new BadRequestException(ErrorCode.NOTIFICATION_SEND_FAIL);
        }
    }

    // 알림 보내기
    public void sendMultipleNotification(List<String> fcmTokens, NotificationMultipleEvent event) throws FirebaseMessagingException {
        MulticastMessage multicastMessage = MulticastMessage.builder()
                .putData("title", event.getTitle())
                .putData("body", event.getNotificationEventType().getMessage())
                .addAllTokens(fcmTokens)
                .build();

        firebaseMessaging.sendEachForMulticast(multicastMessage);
    }
}