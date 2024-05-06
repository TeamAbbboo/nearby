package com.abbboo.backend.global.base;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    // story, reaction
    STORY_UPLOAD_SUCCESS(201, "소식 업로드에 성공하였습니다.", "SUCCESS"),
    STORY_SAVE_SUCCESS(204, "소식 보관에 성공하였습니다.", "SUCCESS"),
    REACTION_REGIST_SUCCESS(201, "반응을 성공적으로 등록했습니다.", "SUCCESS"),
    DAYSTORY_GET_SUCCESS(200, "24시간 이내 소식 조회에 성공하였습니다.", "SUCCESS"),

    // user
    USER_CHECK_SUCCESS(200,"유저 정보 조회에 성공하였습니다.","SUCCESS"),
    USER_MODIFY_SUCCESS(204,"유저 정보 수정에 성공하였습니다.","SUCCESS"),
    USER_REGIST_SUCCESS(204,"유저 정보 수정에 성공하였습니다.","SUCCESS"),
    USER_LOGIN_SUCCESS(200,"로그인에 성공하였습니다.","SUCCESS")
    ;

    private final int status;
    private final String message;
    private final String code;
}
