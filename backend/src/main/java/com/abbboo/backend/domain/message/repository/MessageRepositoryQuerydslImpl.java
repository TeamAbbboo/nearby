package com.abbboo.backend.domain.message.repository;

import static com.abbboo.backend.domain.message.entity.QMessageTemplate.messageTemplate;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class MessageRepositoryQuerydslImpl implements MessageRepositoryQuerydsl{

    private final JPAQueryFactory jpaQueryFactory;

    // 오글 메시지 템플릿 랜덤 조회
    @Override
    public String findRandeomTemplate() {

        String content = jpaQueryFactory
            .select(messageTemplate.content)
            .from(messageTemplate)
            .orderBy(Expressions.numberTemplate(Double.class, "rand()").asc())
            .limit(1)
            .fetchOne();

        return content;
    }
}