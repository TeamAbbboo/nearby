package com.abbboo.backend.domain.story.service;

import org.springframework.web.multipart.MultipartFile;

public interface StoryService {

    void createStroy(MultipartFile multipartFile);

    void updateIsSaved(Long storyId);

    void createReaction(String expression, Long storyId);
}
