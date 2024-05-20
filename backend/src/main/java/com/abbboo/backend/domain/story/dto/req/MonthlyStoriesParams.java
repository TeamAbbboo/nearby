package com.abbboo.backend.domain.story.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "월 별 소식 조회 조건")
public class MonthlyStoriesParams {

    @Pattern(regexp = "^\\d{4}$", message = "년도는 YYYY 형식이어야 합니다.")
    private Integer year;    // 년도
    @Pattern(regexp = "^(0[1-9]|1[0-2])$", message = "월은 MM 형식이어야 합니다.")
    private Integer month;   // 월
    private Integer size;   // 페이지 별 조회할 데이터 개수
}