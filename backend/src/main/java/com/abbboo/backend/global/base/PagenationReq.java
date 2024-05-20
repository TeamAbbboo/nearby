package com.abbboo.backend.global.base;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PagenationReq { // pageable에 사용되는 공통 객체
    
    private int page; // 현재 페이지
    private int size; // 데이터 개수
}
