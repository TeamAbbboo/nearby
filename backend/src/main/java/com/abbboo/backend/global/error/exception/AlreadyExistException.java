package com.abbboo.backend.global.error.exception;

import com.abbboo.backend.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class AlreadyExistException extends RuntimeException { // 이미 존재하는 정보에 대한 예외
    private ErrorCode errorCode;

    public AlreadyExistException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
