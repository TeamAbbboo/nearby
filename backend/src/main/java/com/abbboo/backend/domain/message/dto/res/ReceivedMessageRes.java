package com.abbboo.backend.domain.message.dto.res;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReceivedMessageRes { // 받은 메시지 정보 응답 객체

    private int fromId;                  // 상대방(보낸 사람) id
    private String nickname;             // 상대방 닉네임
    private String mood;                 // 상대방 상태
    private String content;              // 메시지 내용
    private LocalDateTime createdAt;     // 메시지 전송 및 수신 일자

    private Boolean isRead;              // 쪽지 읽음 여부
    private String ttsUrl;               // tts 파일 url
}
