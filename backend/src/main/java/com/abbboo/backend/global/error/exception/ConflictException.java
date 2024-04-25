package com.abbboo.backend.global.error.exception;

import com.abbboo.backend.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class ConflictException extends RuntimeException{
    private ErrorCode errorCode;

    public ConflictException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
