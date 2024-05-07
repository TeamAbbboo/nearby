package com.abbboo.backend.domain.user.dto.res;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserLoginRes {

    // 유저 식별 ID
    private Integer userId;

    // 가족 식별 ID
    private Integer familyId;

    // 유저 닉네임
    private String nickname;

    // 유저 생일
    private LocalDate birthday;

    // 유저 상태
    private String mood;

    public UserLoginRes(Integer userId, Integer familyId, String nickname, LocalDate birthday, String mood) {
        this.userId = userId;
        this.familyId = familyId;
        this.nickname = nickname;
        this.birthday = birthday;
        this.mood = mood;
    }
}