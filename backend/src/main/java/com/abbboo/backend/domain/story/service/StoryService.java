package com.abbboo.backend.domain.story.service;

import com.abbboo.backend.domain.story.dto.req.YearMonthDayParams;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.req.StoriesReq;
import com.abbboo.backend.domain.story.dto.StoryReactionReq;
import org.springframework.web.multipart.MultipartFile;

public interface StoryService {

    void createStroy(MultipartFile frontFile, MultipartFile rearFile);

    void updateIsSaved(Long storyId);

    DayStoryListRes readDayStory(StoriesReq storiesReq);
  
    void createReaction(StoryReactionReq reactionReq, Long storyId);

    DayStoryListRes readDailySavedStory(YearMonthDayParams params);
}
