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
    Long expId;
    Integer userId;
    Integer level;
    Integer point;
    String content;
    LocalDateTime createAt;
}