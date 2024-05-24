package com.abbboo.backend.domain.expHistory.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Formatter;

@Getter
@Builder
@AllArgsConstructor
public class GetLevelAndExpSumRes {
    private int level;
    private int currentExp;
    private int maxExp;
    // 가족이 생성된 날짜
    private String startDate;
}
