package com.abbboo.backend.domain.message.dto.res;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SentMessageRes { // 보낸 메시지 정보 응답 객체
    
    private int receiverId;              // 상대방 id
    private String nickname;             // 상대방 닉네임
    private String mood;                 // 상대방 상태
    private String content;              // 메시지 내용
    private LocalDateTime createdAt;     // 메시지 전송 및 수신 일자

}
