package com.abbboo.backend.domain.story.repository;

import com.abbboo.backend.domain.story.dto.req.MonthlyStoriesParams;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.res.MonthlyStoryRes;
import java.util.List;

public interface StoryRepositoryQuerydsl {

    DayStoryListRes findDayStoriesByFamilyId(int familyId);

    List<MonthlyStoryRes> findMonthlyStories(MonthlyStoriesParams monthlyStoriesParams, int familyId);
}
