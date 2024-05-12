package com.abbboo.backend.domain.decoration.service;

import com.abbboo.backend.domain.decoration.dto.req.DecorateReq;

public interface DecorationService {

    void updatePenguin(String createdUserId, DecorateReq req);
}
