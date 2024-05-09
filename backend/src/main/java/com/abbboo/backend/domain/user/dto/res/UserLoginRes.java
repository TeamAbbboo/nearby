package com.abbboo.backend.domain.user.dto.res;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserLoginRes {

    // 가족 식별 ID
    private Integer familyId;

    // 닉네임
    private String nickname;

    // 생년월일
    private LocalDate birthday;

    @Builder
    public UserLoginRes(Integer familyId, String nickname, LocalDate birthday) {
        this.familyId = familyId;
        this.nickname = nickname;
        this.birthday = birthday;
    }
}