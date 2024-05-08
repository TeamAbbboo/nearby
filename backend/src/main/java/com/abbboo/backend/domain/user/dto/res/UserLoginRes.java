package com.abbboo.backend.domain.user.dto.res;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserLoginRes {

    // 가족 식별 ID
    private Integer familyId;

    @Builder
    public UserLoginRes(Integer familyId) {
        this.familyId = familyId;
    }
}