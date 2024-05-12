package com.abbboo.backend.domain.mood.controller;

import com.abbboo.backend.domain.mood.dto.req.MoodReq;
import com.abbboo.backend.domain.mood.service.MoodService;
import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.base.BaseResponse;
import com.abbboo.backend.global.base.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mood")
public class MoodController {

    private final MoodService moodService;

    @Operation(summary = "펭귄의 상태(mood) 변경 API")
    @PatchMapping
    public ResponseEntity<BaseResponse> changeMood(@RequestBody MoodReq req,
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        moodService.updateMood(customOAuth2User.getCreatedUserId(), req);
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.UPDATE_PENGUIN_SUCCESS));
    }

}
