package com.abbboo.backend.domain.expHistory.entity.res;

import com.abbboo.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ExpHistoryDto {
    Long expId;
    Integer userId;
    Integer level;
    Integer point;
    String content;
    String createAt;
}