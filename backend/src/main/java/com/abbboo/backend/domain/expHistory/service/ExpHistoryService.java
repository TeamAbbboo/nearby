package com.abbboo.backend.domain.expHistory.service;

import com.abbboo.backend.domain.expHistory.dto.req.LevelUpReq;
import com.abbboo.backend.domain.expHistory.dto.res.GetExpHistoryRes;
import com.abbboo.backend.domain.expHistory.dto.res.GetLevelAndExpSumRes;
import com.abbboo.backend.global.base.PagenationReq;

public interface ExpHistoryService {
    GetExpHistoryRes getExpHistory(String kakaoId, PagenationReq pagenationReq);
    void updateLevel(String kakaoId, LevelUpReq levelUpReq);

    GetLevelAndExpSumRes getLevelAndExpSum(String kakaoId);
}
