package com.abbboo.backend.domain.decoration.controller;

import com.abbboo.backend.domain.decoration.dto.req.DecorateReq;
import com.abbboo.backend.domain.decoration.service.DecorationService;
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
@RequestMapping("decoration")
@RequiredArgsConstructor
public class DecorationController {

    private final DecorationService decorationService;

    @Operation(summary = "펭귄 꾸미기 API")
    @PatchMapping
    public ResponseEntity<BaseResponse> decoratePenguin(@RequestBody DecorateReq req,
        @AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        decorationService.updatePenguin(customOAuth2User.getCreatedUserId(), req);
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.UPDATE_PENGUIN_SUCCESS));
    }
}
