package com.abbboo.backend.global.base;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    // 예시 데이터
    EXAMPLE_CODE(200, "성공하였습니다.", "SUCCESS");

    private final int status;
    private final String message;
    private final String code;
}
