package com.abbboo.backend.domain.story.controller;

import static com.abbboo.backend.global.base.SuccessCode.STORY_UPLOAD_SUCCESS;

import com.abbboo.backend.domain.story.service.StoryService;
import com.abbboo.backend.global.base.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/stories")
@RequiredArgsConstructor
@Tag(name = "stories", description = "소식 API")
public class StoryController {

    private final StoryService storyService;

    @Operation(summary = "소식 등록")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> uploadStory(
        @RequestParam("file") MultipartFile multipartFile){
        storyService.createStroy(multipartFile);
        return ResponseEntity.ok(BaseResponse.of(STORY_UPLOAD_SUCCESS));
    }
}
