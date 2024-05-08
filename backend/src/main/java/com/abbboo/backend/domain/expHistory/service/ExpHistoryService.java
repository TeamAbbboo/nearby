package com.abbboo.backend.domain.expHistory.service;

import com.abbboo.backend.domain.expHistory.dto.res.GetExpHistoryRes;
import com.abbboo.backend.global.base.PagenationReq;

public interface ExpHistoryService {
    GetExpHistoryRes getExpHistory(String kakaoId, PagenationReq pagenationReq);
}
