package com.abbboo.backend.global.base;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    // story, reaction
    STORY_UPLOAD_SUCCESS(200, "소식 업로드에 성공하였습니다.", "SUCCESS"),
    STORY_SAVE_SUCCESS(200, "소식 보관에 성공하였습니다.", "SUCCESS"),
    REACTION_REGIST_SUCCESS(200, "소식에 성공적으로 반응했습니다.", "SUCCESS"),
    ;

    private final int status;
    private final String message;
    private final String code;
}
