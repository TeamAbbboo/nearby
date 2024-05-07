package com.abbboo.backend.domain.family.service;

import com.abbboo.backend.domain.family.dto.res.FamilyGenerateRes;

public interface FamilyService {

    // 가족 생성
    FamilyGenerateRes createFamily(String kakaoId);
}
