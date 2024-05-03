package com.abbboo.backend.domain.story.dto.res;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DayStoryListRes { // 24시간이내 소식 정보 목록 응답

    List<DayStoryRes> dayStoryResList;

}
