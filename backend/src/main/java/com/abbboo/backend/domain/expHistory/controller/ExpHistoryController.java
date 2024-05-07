package com.abbboo.backend.domain.expHistory.controller;

import com.abbboo.backend.domain.expHistory.entity.res.GetExpHistoryRes;
import com.abbboo.backend.domain.expHistory.service.ExpHistoryService;
import com.abbboo.backend.global.base.BaseResponse;
import com.abbboo.backend.global.base.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/exp")
@RequiredArgsConstructor
@Tag(name = "exp histories", description = "경험치 API")
public class ExpHistoryController {
    final private ExpHistoryService expHistoryService;
    @GetMapping
    @Operation(summary = "경험치 내역 조회")
    ResponseEntity<BaseResponse> getExpHistories(@PathVariable Integer userId)
//            TODO: request header로 수정
//            @RequestHeader("") userId)
    {
        GetExpHistoryRes getExpHistoryRes=expHistoryService.getExpHistory(userId);
        return ResponseEntity.ok(BaseResponse.of(SuccessCode.EXPHISTORY_GET_SUCCESS,getExpHistoryRes));
    }
}
