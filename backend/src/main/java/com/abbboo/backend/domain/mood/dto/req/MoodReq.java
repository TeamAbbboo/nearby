package com.abbboo.backend.domain.mood.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MoodReq { // 펭귄의 mood 변경 req

    private String mood;
}
