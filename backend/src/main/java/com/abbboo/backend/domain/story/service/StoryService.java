package com.abbboo.backend.domain.story.service;

import com.abbboo.backend.domain.story.dto.StoryReactionReq;
import org.springframework.web.multipart.MultipartFile;

public interface StoryService {

    void createStroy(MultipartFile multipartFile);

    void updateIsSaved(Long storyId);

    void createReaction(StoryReactionReq reactionReq, Long storyId);

}
