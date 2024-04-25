package com.abbboo.backend.global.base;

import lombok.Getter;

@Getter
public class BaseResponse {

    private final int status;       // 응답 코드
    private final String message;   // 메시지
    private final String code;      // 성공,실패 여부 코드 (SUCCESS or FAIL-CODE)
    private final Object data;      // 데이터

    private BaseResponse(SuccessCode successCode, Object data) {
        this.status = successCode.getStatus();
        this.message = successCode.getMessage();
        this.code = successCode.getCode();
        this.data = data;
    }

    public static BaseResponse of(SuccessCode successCode, Object data) {
        return new BaseResponse(successCode, data);
    }

    public static BaseResponse of(SuccessCode successCode) {
        return new BaseResponse(successCode, "");
    }


}
