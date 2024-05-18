package com.abbboo.backend.domain.notification.service;

import com.abbboo.backend.domain.notification.dto.req.NotificationPokeActionReq;
import com.abbboo.backend.domain.notification.dto.res.ReceivedNotificationRes;
import com.abbboo.backend.global.base.PagenationReq;
import org.springframework.data.domain.Slice;

public interface NotificationService {

    // 전체 알림 내역 조회
    Slice<ReceivedNotificationRes> findReceivedNotification(String kakaoId, PagenationReq pagenationReq);

    // 읽지 않은 알림 조회
    ReceivedNotificationRes findUnreadNotification(String kakaoId);

    // 꾸욱 누르기
    void createPokeAction(String kakaoId, NotificationPokeActionReq notificationPokeActionReq);
}
