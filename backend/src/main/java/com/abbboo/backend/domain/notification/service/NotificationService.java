package com.abbboo.backend.domain.notification.service;

import com.abbboo.backend.domain.notification.dto.req.NotificationPokeActionReq;
import com.abbboo.backend.domain.notification.dto.res.ReceivedNotificationRes;
import com.abbboo.backend.global.base.PagenationReq;
import org.springframework.data.domain.Slice;

public interface NotificationService {

    // 전체 알림 내역 조회
    Slice<ReceivedNotificationRes> findReceivedNotification(String kakaoId, PagenationReq pagenationReq);

    // 꾸욱 누르기
    void createPokeAction(String kakaoId, NotificationPokeActionReq notificationPokeActionReq);
}
