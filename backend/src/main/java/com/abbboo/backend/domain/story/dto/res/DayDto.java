package com.abbboo.backend.domain.story.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DayDTO {  // 일자별 대표 소식 이미지

    private int day;        // 날짜
    private long storyId;   // 소식 id
    private String rearUrl; // 소식의 후면 이미지 url
    
}
