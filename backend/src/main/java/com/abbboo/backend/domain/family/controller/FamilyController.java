package com.abbboo.backend.domain.family.controller;

import com.abbboo.backend.domain.family.dto.res.FamilyCodeCheckRes;
import com.abbboo.backend.domain.family.dto.res.FamilyGenerateRes;
import com.abbboo.backend.domain.family.service.FamilyService;
import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.base.BaseResponse;
import com.abbboo.backend.global.base.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/families")
@RequiredArgsConstructor
@Tag(name = "families", description = "가족 API")
public class FamilyController {

    private final FamilyService familyService;

    @Operation(summary = "가족 생성")
    @PostMapping("")
    public ResponseEntity<BaseResponse> generateFamily(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("가족 생성 URL 맵핑 : OK");

        log.info("가족 생성 : START");
        FamilyGenerateRes familyGenerateRes = familyService.createFamily(customOAuth2User.getCreatedUserId());
        log.info("가족 생성 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.FAMILY_CREATE_SUCCESS,familyGenerateRes));
    }

    @Operation(summary = "가족 코드 조회")
    @GetMapping("/code")
    public ResponseEntity<BaseResponse> checkFamilyCode(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("가족 코드 조회 URL 맵핑 : OK");

        log.info("가족 코드 조회 : START");
        FamilyCodeCheckRes familyCodeCheckRes = familyService.getFamilyCode(customOAuth2User.getCreatedUserId());
        log.info("가족 코드 조회 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.FAMILY_CODE_CHECK_SUCCESS,familyCodeCheckRes));
    }
}
