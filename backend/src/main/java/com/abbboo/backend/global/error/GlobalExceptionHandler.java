package com.abbboo.backend.global.error;

import com.abbboo.backend.global.error.exception.BadRequestException;
import com.abbboo.backend.global.error.exception.ConflictException;
import com.abbboo.backend.global.error.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ExceptionHandler(value = NotFoundException.class)
    public ErrorResponse handleNotFoundException(NotFoundException e) {
        return new ErrorResponse(e.getErrorCode().getStatus(), e.getErrorCode().getMessage(), e.getErrorCode().getCode(), "");

    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = BadRequestException.class)
    public ErrorResponse handleBadRequestException(BadRequestException e) {
        return new ErrorResponse(e.getErrorCode().getStatus(), e.getErrorCode().getMessage(), e.getErrorCode().getCode(), "");
    }

    @ResponseStatus(value = HttpStatus.CONFLICT)
    @ExceptionHandler(value = ConflictException.class)
    public ErrorResponse handleConflictException(ConflictException e) {
        return new ErrorResponse(e.getErrorCode().getStatus(), e.getErrorCode().getMessage(), e.getErrorCode().getCode(), "");
    }

}
