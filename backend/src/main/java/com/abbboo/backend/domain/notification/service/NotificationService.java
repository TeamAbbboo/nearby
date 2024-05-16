package com.abbboo.backend.domain.notification.service;

import com.abbboo.backend.domain.notification.dto.req.NotificationPokeActionReq;

public interface NotificationService {

    // 꾸욱 누르기
    void createPokeAction(String kakaoId, NotificationPokeActionReq notificationPokeActionReq);
}
