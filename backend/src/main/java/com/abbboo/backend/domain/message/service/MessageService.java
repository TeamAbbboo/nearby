package com.abbboo.backend.domain.message.service;

import com.abbboo.backend.domain.message.dto.req.SendMessageReq;

public interface MessageService {

    void createMessage(String kakaoId, SendMessageReq req);
}
