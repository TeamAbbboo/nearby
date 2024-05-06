package com.abbboo.backend.domain.story.repository;

import static com.abbboo.backend.domain.reaction.entity.QReactionHistory.reactionHistory;
import static com.abbboo.backend.domain.story.entity.QStory.story;

import com.abbboo.backend.domain.story.dto.req.YearMonthDayParams;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.res.DayStoryRes;
import com.abbboo.backend.domain.story.dto.res.ReactionRes;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StoryRepositoryQuerydslImpl implements StoryRepositoryQuerydsl{

    private final JPAQueryFactory jpaQueryFactory;

    // 24시간 이내의 가족들의 보관된 소식 조회
    @Override
    public DayStoryListRes findDayStoriesByFamilyId(int familyId) {
        return findStoryList(twentyfourHoursCondition(familyId));
    }

    // 요청된 일자에 따른 가족들의 보관된 소식 조회
    @Override
    public DayStoryListRes findDailySavedStoriesByFamilyId(YearMonthDayParams params, int familyId) {
        return findStoryList(YearMonthDayCondition(params, familyId));
    }

    // 조건에 따른 보관된 소식 조회
    private DayStoryListRes findStoryList(BooleanExpression condition){

        List<DayStoryRes> dayStoryResList = jpaQueryFactory.select(Projections.fields(
                DayStoryRes.class,
                story.id.as("storyId"),
                story.frontUrl.as("frontUrl"),
                story.rearUrl.as("rearUrl"),
                story.user.mood.as("mood"),
                story.user.nickname.as("nickname"),
                story.isSaved.as("isSaved"),
                story.createdAt.as("createdAt")
            ))
            .from(story)
            .where(condition)
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
            reactionHistory.user.mood,
            reactionHistory.user.nickname,
            reactionHistory.reaction.expression,
            reactionHistory.createdAt
        ))
            .from(reactionHistory)
            .where(reactionHistory.story.id.eq(dayStoryRes.getStoryId()))    // 각 소식 id
            .fetch();

        dayStoryRes.setReactions(reactionRes);
    }

    // 비교 조건 : 가족 id 일치 & 생성일자가 지금으로부터 24시간 이내인 조건 생성
    private BooleanExpression twentyfourHoursCondition(int familyId){

        LocalDateTime dayAgo = LocalDateTime.now().minusHours(24);
        return (story.user.family.id.eq(familyId)).and(story.createdAt.after(dayAgo));
    }

    // 동등 조건 : 생성일자가 요청된 일자(YYYY-MM-dd)와 일치하는 조건 생성
    private BooleanExpression YearMonthDayCondition(YearMonthDayParams params,int familyId){
        YearMonth yearMonth = YearMonth.of(params.getYear(), params.getMonth());
        LocalDate requestDay = yearMonth.atDay(params.getDay());
        return (Expressions.dateTemplate(LocalDate.class, "DATE({0})", story.createdAt)
            .eq(requestDay)).and(story.user.family.id.eq(familyId));
    }
}