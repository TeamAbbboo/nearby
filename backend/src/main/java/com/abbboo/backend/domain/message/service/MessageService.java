package com.abbboo.backend.domain.message.service;

import com.abbboo.backend.domain.message.dto.req.SendMessageReq;
import com.abbboo.backend.domain.message.dto.res.ReceivedMessageRes;
import com.abbboo.backend.domain.message.dto.res.SentMessageRes;
import com.abbboo.backend.global.base.PagenationReq;
import org.springframework.data.domain.Slice;

public interface MessageService {

    void createMessage(String kakaoId, SendMessageReq req);

    Slice<SentMessageRes> findSentMessage(String kakaoId, PagenationReq pagenationReq);

    Slice<ReceivedMessageRes> findReceivedMessage(String kakaoId, PagenationReq pagenationReq);

    Slice<ReceivedMessageRes> findUnreadMessage(String kakaoId);
}
