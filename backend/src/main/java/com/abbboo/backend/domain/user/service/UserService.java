package com.abbboo.backend.domain.user.service;

import com.abbboo.backend.domain.user.dto.req.UserModifyReq;

public interface UserService {

    // 유저 정보 수정
    void updateUser(String kakaoId, UserModifyReq userModifyReq);
}
