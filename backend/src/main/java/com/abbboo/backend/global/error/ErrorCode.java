package com.abbboo.backend.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // S3 컨텐츠 관련 오류
    FILE_IS_NULL(400, "파일은 필수값입니다. 소식 등록에 실패했습니다.", "F-001", ""),
    UPLOAD_IS_FAIL(500, "파일 업로드에 실패했습니다. 서버가 잘못했습니다.", "F-002", ""),

    // Pagination 관련 오류
    INVALID_PAGE_NUMBER(400,"페이지 번호는 0 이상이어야 합니다.","P-001",""),
    INVALID_PAGE_SIZE(400,"페이지 사이즈는 1 이상이어야 합니다.","P-002",""),

    // Story
    STORY_NOT_FOUND(404, "소식을 찾을 수 없습니다.", "S-001", ""),
    REACTION_IS_WRONG(400, "잘못된 반응을 요청했습니다.", "S-002", ""),

    // User
    USER_NOT_FOUND(404, "사용자를 찾을 수 없습니다", "U-001", ""),
    USER_EXIST_FAMILY(404, "이미 가족이 존재합니다.", "U-002", ""),

    // Family
    FAMILY_NOT_FOUND(404, "가족을 찾을 수 없습니다.", "FA-001", ""),

    // Message
    RECEIVER_NOT_FOUND(404, "메시지를 받을 사용자가 존재하지 않습니다.", "M-001", ""),
    NOT_SAME_FAMILY(400, "메시지는 가족끼리만 주고 받을 수 있습니다.", "M-002", ""),
    MESSAGE_LENGTH_EXCEEDED(400, "메시지는 100자를 초과할 수 없습니다.", "M-003", ""),
    ;

    private final int status;
    private final String message;
    private final String code;
    private final String data;
}
