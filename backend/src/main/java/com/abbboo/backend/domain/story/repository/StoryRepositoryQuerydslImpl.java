package com.abbboo.backend.domain.story.repository;

import static com.abbboo.backend.domain.story.entity.QStory.story;

import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.res.DayStoryRes;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StoryRepositoryQuerydslImpl implements StoryRepositoryQuerydsl{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public DayStoryListRes findDayStoriesByFamilyId(int familyId) {
        BooleanBuilder booleanBuilder =generateQueryCondition(familyId);
        List<DayStoryRes> dayStoryResList = jpaQueryFactory.select(Projections.fields(
            DayStoryRes.class,
            story.id.as("storyId"),
            story.user.id.as("userId"),
            story.url.as("url"),
            story.user.mood.as("mood"),
            story.user.nickname.as("nickname"),
            story.isSaved.as("isSaved")
        ))
            .from(story)
            .where(booleanBuilder)
            .orderBy(story.createdAt.asc())
            .fetch();

        return new DayStoryListRes(dayStoryResList);
    }

    private BooleanBuilder generateQueryCondition(int familyId){
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        // 지금으로부터 24시간 이내인 소식을 조회하는 조건
        LocalDateTime dayAgo = LocalDateTime.now().minusHours(24);
        booleanBuilder.and(story.user.family.id.eq(familyId))
            .and(story.createdAt.after(dayAgo));
        return booleanBuilder;
    }
}
