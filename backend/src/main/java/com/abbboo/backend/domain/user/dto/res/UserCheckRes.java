package com.abbboo.backend.domain.user.dto.res;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserCheckRes {

    // 유저 닉네임
    private String nickname;

    // 유저 생일
    private LocalDate birthday;

    @Builder
    public UserCheckRes(String nickname, LocalDate birthday) {
        this.nickname = nickname;
        this.birthday = birthday;
    }
}
