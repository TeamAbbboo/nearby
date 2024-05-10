package com.abbboo.backend.domain.expHistory.controller;

import com.abbboo.backend.domain.expHistory.dto.req.LevelUpReq;
import com.abbboo.backend.domain.expHistory.dto.res.GetExpHistoryRes;
import com.abbboo.backend.domain.expHistory.service.ExpHistoryService;
import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.base.BaseResponse;
import com.abbboo.backend.global.base.PagenationReq;
import com.abbboo.backend.global.base.SuccessCode;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.NotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/exp")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "exp histories", description = "경험치 API")
public class ExpHistoryController {
    final private ExpHistoryService expHistoryService;
    @GetMapping
    @Operation(summary = "경험치 내역 조회")
    ResponseEntity<BaseResponse> getExpHistories(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                 @ModelAttribute @ParameterObject PagenationReq pagenationReq)
    {
        log.info("userId : {}",customOAuth2User.getCreatedUserId());
        if(pagenationReq.getPage()<0)
        {
            throw new NotFoundException(ErrorCode.INVALID_PAGE_NUMBER);
        }
        if(pagenationReq.getSize()<1)
        {
            throw new NotFoundException(ErrorCode.INVALID_PAGE_SIZE);
        }
        GetExpHistoryRes getExpHistoryRes=expHistoryService.getExpHistory(customOAuth2User.getCreatedUserId(),pagenationReq);
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.EXPHISTORY_GET_SUCCESS,getExpHistoryRes));
    }

    @PatchMapping("/level")
    @Operation(summary = "레벨 높이기")
    ResponseEntity<BaseResponse> levelUp(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                         @RequestBody LevelUpReq levelUpReq)
    {
        log.info("레벨 높이기 입력: userId : {}, level : {}", customOAuth2User.getCreatedUserId(),levelUpReq.getLevel());
        expHistoryService.updateLevel(customOAuth2User.getCreatedUserId(),levelUpReq);
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.LEVEL_UP_SUCCESS));
    }

}