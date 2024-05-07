package com.abbboo.backend.domain.story.repository;

import static com.abbboo.backend.domain.reaction.entity.QReactionHistory.reactionHistory;
import static com.abbboo.backend.domain.story.entity.QStory.story;

import com.abbboo.backend.domain.story.dto.req.YearMonthDayParams;
import com.abbboo.backend.domain.story.dto.req.MonthlyStoriesParams;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.res.DayStoryRes;
import com.abbboo.backend.domain.story.dto.res.MonthlyStoryRes;
import com.abbboo.backend.domain.story.dto.res.ReactionRes;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.abbboo.backend.domain.story.dto.res.dayDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Slf4j
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

    // 월 별 소식 조회
    @Override
    public List<MonthlyStoryRes> findMonthlyStories(MonthlyStoriesParams params, int familyId) {
        // TODO: 페이징 무한스크롤 추후 클라이언트와 협의 후 구현

        List<Tuple> results = jpaQueryFactory.select(
                story.createdAt.yearMonth(),
                story.createdAt.dayOfMonth(),
                story.id,
                story.rearUrl
            )
            .from(story)
            .where(MonthlyCondition(params,familyId))
            .fetch();

        // 결과 데이터를 월별로 그룹화
        Map<Integer, List<dayDto>> groupedByMonth = results.stream()
            .collect(Collectors.groupingBy(
                tuple -> tuple.get(0, Integer.class),
                Collectors.mapping(tuple -> new dayDto(tuple.get(1, Integer.class), tuple.get(2, Long.class), tuple.get(3, String.class)), Collectors.toList())
            ));

        // 결과 리스트 생성
        List<MonthlyStoryRes> result = new ArrayList<>();
        for (Map.Entry<Integer, List<dayDto>> entry : groupedByMonth.entrySet()) {
            Integer month = entry.getKey();
            List<dayDto> monthData = entry.getValue();
            result.add(new MonthlyStoryRes(month.toString(), monthData));
        }

        return result;
    }

    // 월 별 소식 조회의 where 절 조건
    private BooleanExpression MonthlyCondition(MonthlyStoriesParams monthlyStoriesParams, int familyId){
        return betweenDate(monthlyStoriesParams).and(monthlyStorySubquery(familyId));
    }

    // between 조건 : 요청된 year,month를 기준으로 생성일자 조회 조건 생성
    private BooleanExpression betweenDate(MonthlyStoriesParams params) {
        int year = params.getYear();
        int month = params.getMonth();

        // param 기준 연도-월 생성
        YearMonth yearMonth = YearMonth.of(year, month);

        // TODO: 추후 paging 무한스크롤 처리로 변경 가능한 부분
        LocalDateTime startDateTime = yearMonth.minusMonths(params.getSize() -1).atDay(1).atStartOfDay();
        LocalDateTime endDateTime = yearMonth.atDay(yearMonth.lengthOfMonth()).atTime(23,59,59);

        log.info("between 조건 : {} - {}", startDateTime, endDateTime);

        return story.createdAt.between(startDateTime,endDateTime);
    }

    // 서브쿼리 : 보관된 소식 & familyId & 그룹화(연-월, 일자)를 조건으로 해당 일자에 가장 먼저 등록된 소식 id 조회
    private BooleanExpression monthlyStorySubquery(int familyId){
        return story.id.in(
            JPAExpressions
                .select(story.id.min())
                .from(story)
                .where(story.user.family.id.eq(familyId), story.isSaved.isTrue())
                .groupBy(story.createdAt.yearMonth(), story.createdAt.dayOfYear())
        );
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