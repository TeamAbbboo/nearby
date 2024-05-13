package com.abbboo.backend.domain.expHistory.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
public class ExpHistoryDto {
    private long expId;
    private String nickname;
    private int level;
    private int point;
    private String content;
    private LocalDateTime createAt;
}