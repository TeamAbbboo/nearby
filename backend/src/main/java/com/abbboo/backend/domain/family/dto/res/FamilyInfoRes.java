package com.abbboo.backend.domain.family.dto.res;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class FamilyInfoRes { // 가족 정보 응답 객체

    private int userId;
    private String nickname;
    private LocalDate birthday;
    private String mood;
    private String decoration;
    
}
