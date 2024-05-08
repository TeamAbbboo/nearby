package com.abbboo.backend.domain.expHistory.dto.res;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Slice;

@Getter
@AllArgsConstructor
public class GetExpHistoryRes {
    int sum;
    Slice<ExpHistoryDto> histories;
}