package com.abbboo.backend.domain.story.dto.res;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DayStoryRes { // 24시간이내 소식 정보 응답

    private Long storyId;
    private String frontUrl;
    private String rearUrl;
    private String mood;
    private String decoration;
    private String nickname;
    private Boolean isSaved;
    private LocalDateTime createdAt;
    List<ReactionRes> reactions;

}
