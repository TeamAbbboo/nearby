package com.abbboo.backend.domain.story.repository;

import com.abbboo.backend.domain.story.dto.req.MonthlyStoriesParams;
import com.abbboo.backend.domain.story.dto.req.YearMonthDayParams;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.res.MonthlyStoryList;

public interface StoryRepositoryQuerydsl {

    DayStoryListRes findDayStoriesByFamilyId(int familyId);

    DayStoryListRes findDailySavedStoriesByFamilyId(YearMonthDayParams params, int familyId);

    MonthlyStoryList findMonthlyStories(MonthlyStoriesParams monthlyStoriesParams, int familyId);
}
