package com.abbboo.backend.global.error.exception;

import com.abbboo.backend.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException{
    private ErrorCode errorCode;

    public NotFoundException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
