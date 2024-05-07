package com.abbboo.backend.domain.story.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "일별 소식 조회 조건")
public class YearMonthDayParams {

    @Pattern(regexp = "^\\d{4}$", message = "년도는 YYYY 형식이어야 합니다.")
    private Integer year;

    @Pattern(regexp = "^(0[1-9]|1[0-2])$", message = "월은 MM 형식이어야 합니다.")
    private Integer month;

    @Pattern(regexp = "^(0[1-9]|[12][0-9]|3[01])$", message = "일은 dd 형식이어야 합니다.")
    private Integer day;

}
