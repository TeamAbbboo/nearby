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
    
    // 유저 펭귄 상태
    private String mood;

    // 유저 펭귄 꾸미기 아이템
    private String decoration;

    @Builder
    public UserCheckRes(String nickname, LocalDate birthday, String mood, String decoration) {
        this.nickname = nickname;
        this.birthday = birthday;
        this.mood = mood;
        this.decoration = decoration;
    }
}
