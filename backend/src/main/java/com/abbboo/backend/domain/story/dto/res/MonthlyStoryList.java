package com.abbboo.backend.domain.story.dto.res;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MonthlyStoryList { // 월별 소식 조회 응답 객체

    private List<MonthlyStoryRes> monthlyStoryResList;  // 월별 소식 목록
    private boolean last;                               // 마지막 페이지 여부

}
