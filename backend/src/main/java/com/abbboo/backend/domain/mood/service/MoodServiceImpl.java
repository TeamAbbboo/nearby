package com.abbboo.backend.domain.mood.service;

import com.abbboo.backend.domain.mood.dto.req.MoodReq;
import com.abbboo.backend.domain.mood.entity.Mood;
import com.abbboo.backend.domain.mood.entity.MoodHistory;
import com.abbboo.backend.domain.mood.repository.MoodHistoryRepository;
import com.abbboo.backend.domain.mood.repository.MoodRepository;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.NotFoundException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MoodServiceImpl implements MoodService{

    private final UserRepository userRepository;
    private final MoodRepository moodRepository;
    private final MoodHistoryRepository historyRepository;

    // 펭귄의 mood 변경
    @Override
    @Transactional
    public void updateMood(String kakaoId, MoodReq req) {
        
        // 사용자 찾기
        User user = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        log.info("변경 전 사용자의 mood : {}", user.getMood());

        // expression으로 mood 찾기
        Mood mood = moodRepository.findByExpressionAndIsDeletedFalse(req.getMood())
            .orElseThrow(() -> new NotFoundException(ErrorCode.ITEM_IS_WRONG));

        // 사용자의 mood 업데이트
        log.info("expression : {} , userId : {}",mood.getExpression(), user.getId());
        user.changeMood(mood.getExpression());
        log.info("변경 후 사용자의 mood : {} - 업데이트 완료!", mood.getExpression());

        // mood_history 추가
        MoodHistory history = MoodHistory.builder()
            .mood(mood).user(user).build();
        historyRepository.save(history);
        log.info("사용자의 mood 적용 내역 업데이트 완료!");
    }
}
