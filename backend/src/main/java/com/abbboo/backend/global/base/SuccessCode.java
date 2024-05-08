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
    DAILYSTORY_GET_SUCCESS(200, "일자별 보관된 소식 조회에 성공하였습니다.", "SUCCESS"),
    MONTLYSTORY_GET_SUCCESS(200, "월 별 보관된 소식 조회에 성공하였습니다.", "SUCCESS"),

    // user
    USER_MODIFY_SUCCESS(204,"유저 정보 수정에 성공하였습니다.","SUCCESS"),
    USER_CHECK_SUCCESS(200,"유저 정보 조회에 성공하였습니다.","SUCCESS"),
    USER_REGIST_SUCCESS(204,"유저 정보 수정에 성공하였습니다.","SUCCESS"),
    USER_LOGIN_SUCCESS(200,"로그인에 성공하였습니다.","SUCCESS"),
    USER_ENROLL_SUCCESS(204,"가족 등록에 성공하였습니다.","SUCCESS"),
    USER_LEAVE_SUCCESS(204,"가족 떠나기에 성공하였습니다.","SUCCESS"),

    // family
    FAMILY_CREATE_SUCCESS(201,"가족 코드 생성에 성공하였습니다.","SUCCESS"),
    FAMILY_CODE_CHECK_SUCCESS(200,"가족 코드 조회에 성공하였습니다.","SUCCESS"),

    // exp
    EXPHISTORY_GET_SUCCESS(200,"경험치 조회에 성공하였습니다.","SUCCESS"),

    // message
    MESSAGE_SEND_SUCCESS(201, "메시지 전송에 성공하였습니다.", "SUCCESS"),
    GET_SENT_MESSAGE_SUCCESS(200, "보낸 메시지 조회에 성공하였습니다.", "SUCCESS"),
    GET_RECEIVED_MESSAGE_SUCCESS(200, "받은 메시지 조회에 성공하였습니다.", "SUCCESS"),
    READ_MESSAGE_SUCCESS(200, "메시지 읽기에 성공하였습니다.", "SUCCESS"),
    ;

    private final int status;
    private final String message;
    private final String code;
}
