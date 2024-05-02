package com.abbboo.backend.domain.story.service;

import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.req.StoriesReq;
import org.springframework.web.multipart.MultipartFile;

public interface StoryService {

    void createStroy(MultipartFile multipartFile);

    void updateIsSaved(Long storyId);

    void createReaction(String expression, Long storyId);

    DayStoryListRes readDayStory(StoriesReq storiesReq);
}
