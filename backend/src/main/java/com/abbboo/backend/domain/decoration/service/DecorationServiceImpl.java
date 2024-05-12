package com.abbboo.backend.domain.decoration.service;

import com.abbboo.backend.domain.decoration.dto.req.DecorateReq;
import com.abbboo.backend.domain.decoration.entity.Decoration;
import com.abbboo.backend.domain.decoration.entity.DecorationHistory;
import com.abbboo.backend.domain.decoration.repository.DecorationHistoryRepository;
import com.abbboo.backend.domain.decoration.repository.DecorationRepository;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DecorationServiceImpl implements DecorationService{

    private final UserRepository userRepository;
    private final DecorationRepository decorationRepository;
    private final DecorationHistoryRepository historyRepository;

    // 사용자의 펭귄 꾸미기 아이템 수정
    @Override
    @Transactional
    public void updatePenguin(String kakaoId, DecorateReq req) {
        User user = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        String item = req.getDecoration();

        // 요청한 아이템 정보 가져오기
        log.info("decoration 아이템 찾기");
        Decoration decoration = decorationRepository.findByItemAndIsDeletedFalse(item);
        if (decoration == null){
            throw new NotFoundException(ErrorCode.ITEM_IS_WRONG);
        }
        log.info("decoration 아이템 찾기 성공!");

        // 사용자 정보 업데이트
        user.chageDecoration(decoration.getItem());
        log.info("사용자의 decoration 업데이트 성공");

        // 사용자의 꾸미기 내역 추가
        DecorationHistory history = DecorationHistory.builder()
            .user(user).decoration(decoration).build();

        historyRepository.save(history);
    }
}
