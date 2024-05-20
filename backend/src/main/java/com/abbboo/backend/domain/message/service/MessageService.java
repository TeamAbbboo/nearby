package com.abbboo.backend.domain.message.service;

import com.abbboo.backend.domain.message.dto.req.SendMessageReq;
import com.abbboo.backend.domain.message.dto.res.ReceivedMessageRes;
import com.abbboo.backend.domain.message.dto.res.SentMessageRes;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.global.base.PagenationReq;
import java.util.List;
import org.springframework.data.domain.Slice;

public interface MessageService {

    void createMessage(String kakaoId, SendMessageReq req);

    Slice<SentMessageRes> findSentMessage(String kakaoId, PagenationReq pagenationReq);

    Slice<ReceivedMessageRes> findReceivedMessage(String kakaoId, PagenationReq pagenationReq);

    ReceivedMessageRes findUnreadMessage(String kakaoId);

    void updateMessageIsRead(String kakaoId, Long messageId);

    // 랜덤 메시지 전송 TODO: createMessage와 같은 기능으로 추후 리팩토링 고민 필요
    void sendMessage(User sender, User receiver, String content);

    // 랜덤 메시지 설정
    void setRandomMessage(Integer senderId);
}
