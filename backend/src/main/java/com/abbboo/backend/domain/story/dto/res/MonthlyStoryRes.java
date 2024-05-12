package com.abbboo.backend.domain.story.dto.res;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class MonthlyStoryRes {

    private String yearMonth;                            // 조회한 년도-월, YYYY-MM 형식
    private List<DayDTO> days;            // 일자별 대표 소식 이미지
}
