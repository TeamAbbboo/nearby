package com.abbboo.backend.domain.message.controller;

import com.abbboo.backend.domain.message.dto.req.SendMessageReq;
import com.abbboo.backend.domain.message.dto.res.SentMessageRes;
import com.abbboo.backend.domain.message.service.MessageService;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
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

    @Operation(summary = "가족들에게 보낸 메시지 조회 API")
    @GetMapping("/sent")
    public ResponseEntity<BaseResponse> getSentMessage(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
        @ModelAttribute @ParameterObject PagenationReq pagenationReq){

        Slice<SentMessageRes> sentMessages =  messageService.findSentMessage(customOAuth2User.getCreatedUserId(), pagenationReq);
        log.info("가족들에게 보낸 메시지 조회 성공 : {}", sentMessages);
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.GET_SENT_MESSAGE_SUCCESS, sentMessages));
    }

}