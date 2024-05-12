package com.abbboo.backend.domain.story.controller;

import static com.abbboo.backend.global.base.SuccessCode.DAILYSTORY_GET_SUCCESS;
import static com.abbboo.backend.global.base.SuccessCode.DAYSTORY_GET_SUCCESS;
import static com.abbboo.backend.global.base.SuccessCode.MONTLYSTORY_GET_SUCCESS;
import static com.abbboo.backend.global.base.SuccessCode.REACTION_REGIST_SUCCESS;
import static com.abbboo.backend.global.base.SuccessCode.STORY_SAVE_SUCCESS;
import static com.abbboo.backend.global.base.SuccessCode.STORY_UPLOAD_SUCCESS;

import com.abbboo.backend.domain.story.dto.req.YearMonthDayParams;
import com.abbboo.backend.domain.story.dto.req.MonthlyStoriesParams;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.req.StoriesReq;
import com.abbboo.backend.domain.story.dto.StoryReactionReq;
import com.abbboo.backend.domain.story.dto.res.MonthlyStoryRes;
import com.abbboo.backend.domain.story.service.StoryService;
import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.base.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
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
        @RequestPart(value = "front") MultipartFile frontFile,
        @RequestPart(value = "rear") MultipartFile rearFile,
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        storyService.createStroy(customOAuth2User.getCreatedUserId(), frontFile, rearFile);
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
        @PathVariable("storyId") Long storyId, @RequestBody StoryReactionReq reactionReq,
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        storyService.createReaction(customOAuth2User.getCreatedUserId(), reactionReq, storyId);
        return ResponseEntity.ok(BaseResponse.of(REACTION_REGIST_SUCCESS));
    }

    @Operation(summary = "24시간 이내 가족의 소식 조회")
    @PostMapping("/day")
    public ResponseEntity<BaseResponse> getDayStory(
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        DayStoryListRes dayStoryList = storyService.readDayStory(customOAuth2User.getCreatedUserId());
        return ResponseEntity.ok(BaseResponse.of(DAYSTORY_GET_SUCCESS, dayStoryList));
    }

    @Operation(summary = "일자별 보관된 가족의 소식 조회")
    @GetMapping("/daily")
    public ResponseEntity<BaseResponse> getDailySavedStory(
        @ModelAttribute @Valid @ParameterObject YearMonthDayParams params,
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        DayStoryListRes dailySavedStory = storyService.readDailySavedStory(customOAuth2User.getCreatedUserId(), params);
        return ResponseEntity.ok(BaseResponse.of(DAILYSTORY_GET_SUCCESS, dailySavedStory));
    }

    @Operation(summary = "보관된 소식을 캘린더에서 월 별 조회")
    @GetMapping("/monthly")
    public ResponseEntity<BaseResponse> getMonthlyStory(
        @ModelAttribute @ParameterObject @Valid MonthlyStoriesParams monthlyStoriesParams,
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        List<MonthlyStoryRes> monthlyStoryListRes = storyService.readMonthlyStory(customOAuth2User.getCreatedUserId(), monthlyStoriesParams);
        return ResponseEntity.ok(BaseResponse.of(MONTLYSTORY_GET_SUCCESS, monthlyStoryListRes));
    }
}
