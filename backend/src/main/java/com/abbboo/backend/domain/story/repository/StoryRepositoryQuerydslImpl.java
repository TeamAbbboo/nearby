package com.abbboo.backend.domain.story.repository;

import static com.abbboo.backend.domain.reaction.entity.QReactionHistory.reactionHistory;
import static com.abbboo.backend.domain.story.entity.QStory.story;

import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.res.DayStoryRes;
import com.abbboo.backend.domain.story.dto.res.ReactionRes;
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
        // where절 조건
        BooleanBuilder booleanBuilder =generateQueryCondition(familyId);

        // 24시간이내 가족들의 소식 조회
        List<DayStoryRes> dayStoryResList = jpaQueryFactory.select(Projections.fields(
            DayStoryRes.class,
            story.id.as("storyId"),
            story.user.id.as("userId"),
            story.frontUrl.as("frontUrl"),
            story.rearUrl.as("rearUrl"),
            story.createdAt.as("createdAt"),
            story.user.mood.as("mood"),
            story.user.nickname.as("nickname"),
            story.isSaved.as("isSaved")
        ))
            .from(story)
            .where(booleanBuilder)
            .orderBy(story.createdAt.asc())
            .fetch();

        // 각 소식 별 반응 목록 넣기
        dayStoryResList.forEach(this::ReactionForDayStory);

        return new DayStoryListRes(dayStoryResList);
    }

    // 각 소식 별 반응 목록 조회
    private void ReactionForDayStory(DayStoryRes dayStoryRes){
        List<ReactionRes> reactionRes = jpaQueryFactory.select(Projections.fields(
            ReactionRes.class,
            reactionHistory.user.id.as("userId"),
            reactionHistory.user.mood,
            reactionHistory.user.nickname,
            reactionHistory.reaction.expression
        ))
            .from(reactionHistory)
            .where(reactionHistory.story.id.eq(dayStoryRes.getStoryId()))    // 각 소식 id
            .fetch();

        dayStoryRes.setReactions(reactionRes);
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