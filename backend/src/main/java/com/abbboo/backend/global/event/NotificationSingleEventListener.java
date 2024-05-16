package com.abbboo.backend.global.event;

import com.abbboo.backend.domain.notification.entity.Notification;
import com.abbboo.backend.domain.notification.repository.NotificationRepository;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.BadRequestException;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

// 단건 - 이벤트를 발생시켰을 시에 eventlistner가 공통적으로 처리
@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationSingleEventListener implements ApplicationListener<NotificationSingleEvent> {

    private final NotificationRepository notificationRepository;
    private final FirebaseMessaging firebaseMessaging;

    @Override
    public void onApplicationEvent(NotificationSingleEvent event) {

        // 알림 이력 저장
        Notification notification = Notification.builder()
                .user(event.getReceiver())
                .title(event.getTitle())
                .content(event.getNotificationEventType().getMessage())
                .build();

        try {
            notificationRepository.save(notification);

            log.info("꾸욱 누르기 - 알림 이력 저장 : OK");

            // 알림 보내기
            sendSingleNotification(notification,event.getReceiver().getFcmToken());

            log.info("꾸욱 누르기 - 알림 보내기 : OK");

        } catch (FirebaseMessagingException e) {
            throw new BadRequestException(ErrorCode.NOTIFICATION_SEND_FAIL);
        }
    }

    // 알림 보내기
    public void sendSingleNotification(Notification notification, String fcmToken) throws FirebaseMessagingException {
        Message message = Message.builder()
                .putData("title", notification.getTitle())
                .putData("body", notification.getContent())
                .setToken(fcmToken)
                .build();

        firebaseMessaging.send(message);
    }
}
