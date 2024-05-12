package com.abbboo.backend.domain.story.service;

import com.abbboo.backend.domain.story.dto.req.YearMonthDayParams;
import com.abbboo.backend.domain.story.dto.req.MonthlyStoriesParams;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.req.StoryReactionReq;
import com.abbboo.backend.domain.story.dto.res.MonthlyStoryRes;
import com.abbboo.backend.domain.story.dto.res.ReactionRes;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface StoryService {

    void createStroy(String kakaoId, MultipartFile frontFile, MultipartFile rearFile);

    void updateIsSaved(Long storyId);

    void createReaction(String kakaoId, StoryReactionReq reactionReq, Long storyId);

    DayStoryListRes readDailySavedStory(String kakaoId, YearMonthDayParams params);

    DayStoryListRes readDayStory(String kakaoId);

    List<MonthlyStoryRes> readMonthlyStory(String kakaoId, MonthlyStoriesParams monthlyStoriesParams);

    List<ReactionRes> readReaction(Long storyId);
}
