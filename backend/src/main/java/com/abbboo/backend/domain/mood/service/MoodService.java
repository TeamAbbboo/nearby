package com.abbboo.backend.domain.mood.service;

import com.abbboo.backend.domain.mood.dto.req.MoodReq;

public interface MoodService {

    void updateMood(String kakaoId, MoodReq req);
}
