package com.abbboo.backend.domain.story.dto.res;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReactionRes { // 소식에 반응한 사용자 정보와 반응 응답

    private String mood;
    private String nickname;
    private String expression;
    private LocalDateTime createdAt;
}
