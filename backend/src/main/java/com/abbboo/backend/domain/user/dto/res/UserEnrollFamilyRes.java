package com.abbboo.backend.domain.user.dto.res;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserEnrollFamilyRes {

    // 가족 식별 ID
    private int familyId;

    @Builder
    public UserEnrollFamilyRes(int familyId) {
        this.familyId = familyId;
    }
}
