package com.abbboo.backend.domain.expHistory.service;

import com.abbboo.backend.domain.expHistory.entity.res.GetExpHistoryRes;

public interface ExpHistoryService {
    GetExpHistoryRes getExpHistory(int userId);
}
