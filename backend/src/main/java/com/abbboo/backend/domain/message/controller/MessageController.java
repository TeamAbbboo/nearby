package com.abbboo.backend.domain.message.controller;

import static com.abbboo.backend.global.base.SuccessCode.MESSAGE_SEND_SUCCESS;

import com.abbboo.backend.domain.message.dto.req.SendMessageReq;
import com.abbboo.backend.domain.message.service.MessageService;
import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.base.BaseEntity;
import com.abbboo.backend.global.base.BaseResponse;
import com.abbboo.backend.global.base.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@Tag(name = "messages", description = "메시지 API")
public class MessageController {

    private final MessageService messageService;

    @Operation(summary = "메시지 전송 API")
    @PostMapping
    public ResponseEntity<BaseResponse> sendMessage(
        @RequestBody SendMessageReq req,
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        messageService.createMessage(customOAuth2User.getCreatedUserId(), req);
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.MESSAGE_SEND_SUCCESS));
    }

}