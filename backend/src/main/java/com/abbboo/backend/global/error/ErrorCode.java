package com.abbboo.backend.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // S3 컨텐츠 관련 오류
    FILE_IS_NULL(400, "파일은 필수값입니다. 소식 등록에 실패했습니다.", "F-001", ""),
    UPLOAD_IS_FAIL(500, "파일 업로드에 실패했습니다. 서버가 잘못했습니다.", "F-002", ""),

    // Story
    STORY_NOT_FOUND(404, "소식을 찾을 수 없습니다", "S-001", ""),

    // User, Family
    USER_NOT_FOUND(404, "사용자를 찾을 수 없습니다", "U-001", ""),
    FAMILY_NOT_FOUND(404, "유효하지 않은 가족 코드입니다.", "U-002", ""),
    ;

    private final int status;
    private final String message;
    private final String code;
    private final String data;
}
