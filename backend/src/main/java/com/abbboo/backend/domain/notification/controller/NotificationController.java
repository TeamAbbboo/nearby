package com.abbboo.backend.domain.notification.controller;

import com.abbboo.backend.domain.notification.dto.req.NotificationPokeActionReq;
import com.abbboo.backend.domain.notification.dto.res.ReceivedNotificationRes;
import com.abbboo.backend.domain.notification.service.NotificationService;
import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.base.BaseResponse;
import com.abbboo.backend.global.base.PagenationReq;
import com.abbboo.backend.global.base.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@Tag(name = "notifications", description = "알림 API")
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "전체 알림 내역 조회")
    @GetMapping("")
    public ResponseEntity<BaseResponse> getReceivedNotification(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
            @ModelAttribute @ParameterObject PagenationReq pagenationReq) {

        log.info("전체 알림 내역 조회 URL 맵핑 : OK");

        log.info("전체 알림 내역 조회 : START");
        Slice<ReceivedNotificationRes> receivedNotifications =
                notificationService.findReceivedNotification(customOAuth2User.getCreatedUserId(), pagenationReq);
        log.info("전체 알림 내역 조회 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.GET_RECEIVED_NOTIFICATION_SUCCESS,receivedNotifications));
    }

    @Operation(summary = "읽지 않은 알림 조회")
    @GetMapping("/unread")
    public ResponseEntity<BaseResponse> getUnreadNotification(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("읽지 않은 알림 조회 URL 맵핑 : OK");

        log.info("읽지 않은 알림 조회 : START");
        ReceivedNotificationRes unreadNotification =
                notificationService.findUnreadNotification(customOAuth2User.getCreatedUserId());
        log.info("읽지 않은 알림 조회 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.GET_RECEIVED_NOTIFICATION_SUCCESS,unreadNotification));
    }

    @Operation(summary = "꾸욱 누르기")
    @PostMapping("/poke")
    public ResponseEntity<BaseResponse> pokeUserOne(
            @RequestBody NotificationPokeActionReq notificationPokeActionReq,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("꾸욱 누르기 URL 맵핑 : OK");

        log.info("꾸욱 누르기 : START");
        notificationService.createPokeAction(customOAuth2User.getCreatedUserId(), notificationPokeActionReq);
        log.info("꾸욱 누르기 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.POKE_CREATE_SUCCESS));
    }
}