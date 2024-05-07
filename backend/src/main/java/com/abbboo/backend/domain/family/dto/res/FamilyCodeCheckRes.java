package com.abbboo.backend.domain.family.dto.res;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FamilyCodeCheckRes {

    // 가족 코드
    private String familyCode;

    @Builder
    public FamilyCodeCheckRes(String familyCode) {
        this.familyCode = familyCode;
    }
}
