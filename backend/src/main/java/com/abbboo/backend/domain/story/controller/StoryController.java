package com.abbboo.backend.domain.story.controller;

import static com.abbboo.backend.global.base.SuccessCode.REACTION_REGIST_SUCCESS;
import static com.abbboo.backend.global.base.SuccessCode.STORY_SAVE_SUCCESS;
import static com.abbboo.backend.global.base.SuccessCode.STORY_UPLOAD_SUCCESS;

import com.abbboo.backend.domain.story.service.StoryService;
import com.abbboo.backend.global.base.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @Operation(summary = "소식 보관")
    @PatchMapping("/{storyId}")
    public ResponseEntity<BaseResponse> saveStory(@PathVariable("storyId") Long storyId){
        storyService.updateIsSaved(storyId);
        return ResponseEntity.ok(BaseResponse.of(STORY_SAVE_SUCCESS));
    }

    @Operation(summary = "소식에 반응 등록")
    @PostMapping("/{storyId}/reactions")
    public ResponseEntity<BaseResponse> registReaction(
        @PathVariable("storyId") Long storyId,@RequestBody String expression){
        storyService.createReaction(expression, storyId);
        return ResponseEntity.ok(BaseResponse.of(REACTION_REGIST_SUCCESS));
    }
}
