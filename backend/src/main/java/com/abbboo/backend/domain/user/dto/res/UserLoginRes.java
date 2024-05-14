package com.abbboo.backend.domain.user.dto.res;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserLoginRes {

    // 가족 식별 ID
    private boolean isFamily;

    // 닉네임
    private String nickname;

    // 생년월일
    private LocalDate birthday;

    @Builder
    public UserLoginRes(boolean isFamily, String nickname, LocalDate birthday) {
        this.isFamily = isFamily;
        this.nickname = nickname;
        this.birthday = birthday;
    }
}