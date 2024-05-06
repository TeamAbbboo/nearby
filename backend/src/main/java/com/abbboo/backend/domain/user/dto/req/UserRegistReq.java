package com.abbboo.backend.domain.user.dto.req;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserRegistReq {

    // 닉네임
    private String nickname;

    // 생년월일
    private LocalDate birthday;
}
