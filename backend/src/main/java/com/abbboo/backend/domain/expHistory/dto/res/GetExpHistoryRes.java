package com.abbboo.backend.domain.expHistory.dto.res;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Slice;

@Getter
@Setter
@AllArgsConstructor
public class GetExpHistoryRes {
    Integer sum;
    Slice<ExpHistoryDto> histories;
}