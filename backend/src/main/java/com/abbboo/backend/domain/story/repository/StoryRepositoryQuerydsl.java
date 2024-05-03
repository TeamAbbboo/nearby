package com.abbboo.backend.domain.story.repository;

import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;

public interface StoryRepositoryQuerydsl {

    DayStoryListRes findDayStoriesByFamilyId(int familyId);
}
