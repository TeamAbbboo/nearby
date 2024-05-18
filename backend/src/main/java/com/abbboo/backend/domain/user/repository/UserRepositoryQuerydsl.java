package com.abbboo.backend.domain.user.repository;

import java.util.Optional;

public interface UserRepositoryQuerydsl {

    // 가족 구성원 중 랜덤 한 명 조회
    Optional<Integer> findRandomUser(int familyId, int senderId);
}