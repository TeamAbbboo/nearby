package com.abbboo.backend.domain.story.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReactionRes { // 소식에 반응한 사용자 정보와 반응 응답

    private Integer userId;
    private String mood;
    private String nickname;
    private String expression;
}
