package com.abbboo.backend.domain.user.service;

import com.abbboo.backend.domain.user.dto.req.UserModifyReq;
import com.abbboo.backend.domain.user.dto.res.UserLoginRes;

public interface UserService {

    // 유저 정보 수정
    void updateUser(String kakaoId, UserModifyReq userModifyReq);

    // 유저 로그인
    UserLoginRes getUserAll(String kakaoId);
}
