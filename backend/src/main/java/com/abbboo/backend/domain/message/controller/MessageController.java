package com.abbboo.backend.domain.message.controller;

import com.abbboo.backend.domain.message.dto.req.SendMessageReq;
import com.abbboo.backend.domain.message.dto.req.messageIdReq;
import com.abbboo.backend.domain.message.dto.res.ReceivedMessageRes;
import com.abbboo.backend.domain.message.dto.res.SentMessageRes;
import com.abbboo.backend.domain.message.service.MessageService;
import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.base.BaseResponse;
import com.abbboo.backend.global.base.PagenationReq;
import com.abbboo.backend.global.base.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<BaseResponse> getSentMessage(
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
        @ModelAttribute @ParameterObject PagenationReq pagenationReq){

        Slice<SentMessageRes> sentMessages =
            messageService.findSentMessage(customOAuth2User.getCreatedUserId(), pagenationReq);
        log.info("가족들에게 보낸 메시지 조회 성공!");
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.GET_SENT_MESSAGE_SUCCESS, sentMessages));
    }

    @Operation(summary = "가족들에게 받은 메시지 조회 API")
    @GetMapping("/received")
    public ResponseEntity<BaseResponse> getReceivedMessage(
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
        @ModelAttribute @ParameterObject PagenationReq pagenationReq){

        Slice<ReceivedMessageRes> receivedMessages =
            messageService.findReceivedMessage(customOAuth2User.getCreatedUserId(), pagenationReq);
        log.info("가족들에게 받은 메시지 조회 성공!");
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.GET_RECEIVED_MESSAGE_SUCCESS, receivedMessages));
    }

    @Operation(summary = "안 읽은 메시지 중 가장 최근 메시지 조회 API")
    @GetMapping("/unread")
    public ResponseEntity<BaseResponse> getUnreadMessage(
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        log.info("안 읽은 메시지 중 가장 최근 메시지 조회 시작");
        ReceivedMessageRes unreadMessageRes = messageService.findUnreadMessage(
            customOAuth2User.getCreatedUserId());
        log.info("안 읽은 메시지 중 가장 최근 메시지 조회 성공!!");
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.GET_RECEIVED_MESSAGE_SUCCESS, unreadMessageRes));
    }

    @Operation(summary = "메시지 읽음 처리 API")
    @PatchMapping
    public ResponseEntity<BaseResponse> getReadMessageOne(
        @RequestBody messageIdReq messageId,
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        log.info("id : {} 메시지 읽기에 성공!!", messageId.getMessageId());
        messageService.updateMessageIsRead(customOAuth2User.getCreatedUserId(), messageId.getMessageId());
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.READ_MESSAGE_SUCCESS));
    }
}