package com.abbboo.backend.domain.message.service;

import com.abbboo.backend.domain.story.entity.Story;
import com.abbboo.backend.domain.story.repository.StoryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

@RequiredArgsConstructor
@Component
@Slf4j
public class ScheduleUtil {

    private final TransactionTemplate transactionTemplate;
    private final StoryRepository storyRepository;
    private final MessageService messageService;

    // 랜덤 메시지 전송
    @Scheduled(cron = "0 0 9 * * ?")   // 아침 9시
//    @Scheduled(cron = "0 0 13 * * ?")  // 점심 13시
    @Scheduled(cron = "0 0 19 * * ?")  // 저녁 19시
    public void createRandomMessage() {
        log.info("랜덤 메시지 전송을 위한 스케줄러 시작");

        // 소식 등록한지 24시간 초과한 사용자 찾기
        transactionTemplate.execute(status -> {
            List<Integer> users = storyRepository.findOverOneday();
            log.info("24시간 초과 사용자 : {}", users.toString());

            for (Integer senderId : users){
                Story lateyStory = storyRepository.findTop1ByUserIdOrderByCreatedAtDesc(senderId);
                log.info("유저 ID : {}",lateyStory.getUser().getId());
                log.info("가장 마지막에 올린 스토리 시간 : {}",lateyStory.getCreatedAt());
                messageService.setRandomMessage(senderId);
            }
            return null;
        });
    }
}
