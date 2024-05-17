package com.abbboo.backend.domain.user.repository;

import static com.abbboo.backend.domain.user.entity.QUser.user;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class UserRepositoryQuerydslImpl implements UserRepositoryQuerydsl{

    private final JPAQueryFactory jpaQueryFactory;

    // 가족 구성원 중 랜덤 한 명 조회
    @Override
    public Optional<Integer> findRandomUser(int familyId, int senderId) {

        log.info("가족 구성원 중 랜덤 한 명 조회");
        Integer receiverId = jpaQueryFactory.select(
            user.id)
            .from(user)
            .where(user.family.id.eq(familyId).and(user.id.notIn(senderId)))
            .orderBy(Expressions.numberTemplate(Double.class, "rand()").asc())
            .limit(1)
            .fetchOne();

        return Optional.ofNullable(receiverId);
    }
}