package com.abbboo.backend.domain.notification.controller;

import com.abbboo.backend.domain.notification.dto.req.NotificationPokeActionReq;
import com.abbboo.backend.domain.notification.service.NotificationService;
import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.base.BaseResponse;
import com.abbboo.backend.global.base.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@Tag(name = "notifications", description = "알림 API")
public class NotificationController {

    private final NotificationService notificationService;

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