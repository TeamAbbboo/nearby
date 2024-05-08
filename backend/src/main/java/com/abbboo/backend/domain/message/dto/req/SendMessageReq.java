package com.abbboo.backend.domain.message.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SendMessageReq {

    private int senderId;
    private int receiverId;
    private String content;

}
