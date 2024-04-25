package com.abbboo.backend.global.error.exception;

import com.abbboo.backend.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class BadRequestException extends RuntimeException{
    private ErrorCode errorCode;

    public BadRequestException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
