package com.abbboo.backend.domain.story.repository;

import com.abbboo.backend.domain.story.dto.req.MonthlyStoriesParams;
import com.abbboo.backend.domain.story.dto.req.YearMonthDayParams;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.res.MonthlyStoryList;
import java.util.List;

public interface StoryRepositoryQuerydsl {

    DayStoryListRes findDayStoriesByFamilyId(int familyId);

    DayStoryListRes findDailySavedStoriesByFamilyId(YearMonthDayParams params, int familyId);

    MonthlyStoryList findMonthlyStories(MonthlyStoriesParams monthlyStoriesParams, int familyId);

    // 마지막 소식 등록이 24시간 초과한 사용자 조회
    List<Integer> findOverOneday();
}
