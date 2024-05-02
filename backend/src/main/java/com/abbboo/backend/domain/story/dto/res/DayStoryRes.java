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
public class DayStoryRes { // 24시간이내 소식 정보 응답

    private Long storyId;
    private Integer userId;
    private String url;
    private String mood;
    private String nickname;
    private Boolean isSaved;
    List<ReactionRes> reactions;

}
