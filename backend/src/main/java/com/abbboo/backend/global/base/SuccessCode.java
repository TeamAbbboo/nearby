package com.abbboo.backend.global.base;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    STORY_UPLOAD_SUCCESS(200, "소식 업로드에 성공하였습니다.", "SUCCESS");

    private final int status;
    private final String message;
    private final String code;
}
