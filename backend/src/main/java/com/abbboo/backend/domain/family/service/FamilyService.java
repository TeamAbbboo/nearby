package com.abbboo.backend.domain.family.service;

import com.abbboo.backend.domain.family.dto.res.FamilyGenerateRes;
import com.abbboo.backend.domain.family.dto.res.FamilyCodeCheckRes;

public interface FamilyService {

    // 가족 생성
    FamilyGenerateRes createFamily(String kakaoId);

    // 가족 코드 조회
    FamilyCodeCheckRes getFamilyCode(String kakaoId);
}
