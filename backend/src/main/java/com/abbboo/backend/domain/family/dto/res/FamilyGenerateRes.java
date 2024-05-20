package com.abbboo.backend.domain.family.dto.res;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FamilyGenerateRes {

    // 가족 식별 ID
    private int familyId;

    // 가족 코드
    private String familyCode;

    @Builder
    public FamilyGenerateRes(int familyId, String familyCode) {
        this.familyId = familyId;
        this.familyCode = familyCode;
    }
}
