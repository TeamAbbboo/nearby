package com.abbboo.backend.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // 예시 데이터
    EXAMPLE_CODE(404, "실패하였습니다.", "F-001","");

    private final int status;
    private final String message;
    private final String code;
    private final String data;
}
