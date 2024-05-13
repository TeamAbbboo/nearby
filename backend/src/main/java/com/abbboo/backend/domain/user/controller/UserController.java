package com.abbboo.backend.domain.user.controller;

import com.abbboo.backend.domain.user.dto.req.UserEnrollFamilyReq;
import com.abbboo.backend.domain.user.dto.req.UserModifyReq;
import com.abbboo.backend.domain.user.dto.req.UserRegistReq;
import com.abbboo.backend.domain.user.dto.res.UserCheckRes;
import com.abbboo.backend.domain.user.dto.res.UserEnrollFamilyRes;
import com.abbboo.backend.domain.user.dto.res.UserLoginRes;
import com.abbboo.backend.domain.user.service.UserService;
import com.abbboo.backend.global.auth.CustomOAuth2User;
import com.abbboo.backend.global.base.BaseResponse;
import com.abbboo.backend.global.base.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

    @Operation(summary = "유저 정보 조회")
    @GetMapping("")
    public ResponseEntity<BaseResponse> getUserMe(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("유저 정보 조회 URL 맵핑 : OK");

        log.info("유저 정보 조회 : START");
        UserCheckRes userCheckRes = userService.getUserMe(customOAuth2User.getCreatedUserId());
        log.info("유저 정보 조회 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_CHECK_SUCCESS,userCheckRes));
    }

    @Operation(summary = "유저 정보 수정")
    @PatchMapping("")
    public ResponseEntity<BaseResponse> modifyUserMe(
            @RequestBody UserModifyReq userModifyReq,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("유저 정보 수정 URL 맵핑 : OK");

        log.info("유저 정보 수정 : START");
        userService.updateUser(customOAuth2User.getCreatedUserId(),userModifyReq);
        log.info("유저 정보 수정 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_MODIFY_SUCCESS));
    }

    @Operation(summary = "유저 가족 등록")
    @PatchMapping("/family/enroll")
    public ResponseEntity<BaseResponse> enrollUserMe(
            @RequestBody UserEnrollFamilyReq userRegistReq,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("유저 가족 등록 URL 맵핑 : OK");

        log.info("유저 가족 등록 : START");
        UserEnrollFamilyRes userEnrollFamilyRes
                =  userService.updateUserFamily(customOAuth2User.getCreatedUserId(),userRegistReq);
        log.info("유저 가족 등록 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_ENROLL_SUCCESS,userEnrollFamilyRes));
    }

    @Operation(summary = "유저 가족 떠나기")
    @PatchMapping("/family/leave")
    public ResponseEntity<BaseResponse> leaveUserMe(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("유저 가족 떠나기 URL 맵핑 : OK");

        log.info("유저 가족 떠나기 : START");
        userService.deleteUserFamily(customOAuth2User.getCreatedUserId());
        log.info("유저 가족 떠나기 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_LEAVE_SUCCESS));
    }

    @Operation(summary = "유저 정보 등록")
    @PatchMapping("/signup")
    public ResponseEntity<BaseResponse> signUpUserMe(
            @RequestBody UserRegistReq userRegistReq,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("유저 정보 등록 URL 맵핑 : OK");

        log.info("유저 정보 등록 : START");
        userService.updateUserAll(customOAuth2User.getCreatedUserId(),userRegistReq);
        log.info("유저 정보 등록 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_REGIST_SUCCESS));
    }

    @Operation(summary = "유저 탈퇴")
    @PatchMapping("/withdrawal")
    public ResponseEntity<BaseResponse> withdrawalUserMe(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("유저 탈퇴 URL 맵핑 : OK");

        log.info("유저 탈퇴 : START");
        userService.deleteUser(customOAuth2User.getCreatedUserId());
        log.info("유저 탈퇴 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_WITHDRAWAL_SUCCESS));
    }

    @Operation(summary = "유저 로그인")
    @PostMapping("/login")
    public ResponseEntity<BaseResponse> loginUserMe(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        log.info("유저 로그인 URL 맵핑 : OK");

        log.info("유저 로그인 : START");
        UserLoginRes userLoginRes = userService.getUserAll(customOAuth2User.getCreatedUserId());
        log.info("유저 로그인 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_LOGIN_SUCCESS,userLoginRes));
    }

    @Operation(summary = "유저 로그아웃")
    @PostMapping("/logout")
    public ResponseEntity<BaseResponse> logoutUserMe(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
            HttpServletResponse response) {

        log.info("유저 로그아웃 URL 맵핑 : OK");

        log.info("유저 로그아웃 : START");
        userService.deleteUserState(customOAuth2User.getCreatedUserId(),response);
        log.info("유저 로그아웃 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_LOGOUT_SUCCESS));
    }

    @Operation(summary = "유저 토큰 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<BaseResponse> reissueToken(
            HttpServletRequest request, HttpServletResponse response) {

        log.info("유저 토큰 재발급 URL 맵핑 : OK");

        log.info("유저 토큰 재발급 : START");
        userService.createUserToken(request,response);
        log.info("유저 토큰 재발급 : COMPLETE");

        return ResponseEntity.ok(BaseResponse.of(SuccessCode.USER_TOKEN_REISSUE_SUCCESS));
    }
}
