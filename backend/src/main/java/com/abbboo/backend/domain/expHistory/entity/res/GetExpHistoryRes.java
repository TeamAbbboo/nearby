package com.abbboo.backend.domain.expHistory.entity.res;


import com.abbboo.backend.domain.expHistory.entity.ExpHistory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetExpHistoryRes {
    Integer sum;
    List<ExpHistoryDto> histories;
}