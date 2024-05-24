package com.abbboo.backend.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ErrorResponse {

    private final int status;       // 응답 코드
    private final String message;   // 메시지
    private final String code;      // 성공,실패 여부 코드 (SUCCESS or FAIL-CODE)
    private final String data;      // 데이터

}
