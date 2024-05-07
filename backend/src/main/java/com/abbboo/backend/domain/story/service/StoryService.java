package com.abbboo.backend.domain.story.service;

import com.abbboo.backend.domain.story.dto.req.YearMonthDayParams;
import com.abbboo.backend.domain.story.dto.req.MonthlyStoriesParams;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.req.StoriesReq;
import com.abbboo.backend.domain.story.dto.StoryReactionReq;
import com.abbboo.backend.domain.story.dto.res.MonthlyStoryRes;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface StoryService {

    void createStroy(MultipartFile frontFile, MultipartFile rearFile);

    void updateIsSaved(Long storyId);

    void createReaction(StoryReactionReq reactionReq, Long storyId);

    DayStoryListRes readDailySavedStory(YearMonthDayParams params);

    DayStoryListRes readDayStory(StoriesReq storiesReq);

    List<MonthlyStoryRes> readMonthlyStory(MonthlyStoriesParams monthlyStoriesParams);

}
