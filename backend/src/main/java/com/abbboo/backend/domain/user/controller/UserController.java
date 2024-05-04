package com.abbboo.backend.domain.user.controller;

import com.abbboo.backend.domain.user.dto.req.UserModifyReq;
import com.abbboo.backend.domain.user.service.UserService;
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
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "users", description = "유저 API")
public class UserController {

    private final UserService userService;

    @Operation(summary = "유저 정보 수정")
    @PatchMapping("")
    public ResponseEntity<BaseResponse> modifyUser(
            @RequestBody UserModifyReq userModifyReq,
            @AuthenticationPrincipal CustomOAuth2User customUserDetails) {

        log.info("유저 정보 수정 URL 맵핑 : OK");

        log.info("유저 정보 수정 : START");
        userService.updateUser(customUserDetails.getCreatedUserId(),userModifyReq);
        log.info("유저 정보 수정 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_MODIFY_SUCCESS));
    }
}
