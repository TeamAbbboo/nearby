package com.abbboo.backend.domain.story.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DayDTO {

    private int day;
    private long storyId;
    private String rearUrl;

}
