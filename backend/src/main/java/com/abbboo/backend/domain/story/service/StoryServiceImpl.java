package com.abbboo.backend.domain.story.service;

import com.abbboo.backend.domain.family.repository.FamilyRepository;
import com.abbboo.backend.domain.reaction.entity.Reaction;
import com.abbboo.backend.domain.reaction.entity.ReactionHistory;
import com.abbboo.backend.domain.reaction.repository.ReactionHistoryRepository;
import com.abbboo.backend.domain.reaction.repository.ReactionRepository;
import com.abbboo.backend.domain.story.dto.res.DayStoryListRes;
import com.abbboo.backend.domain.story.dto.req.StoriesReq;
import com.abbboo.backend.domain.story.dto.StoryReactionReq;
import com.abbboo.backend.domain.story.entity.Story;
import com.abbboo.backend.domain.story.repository.StoryRepository;
import com.abbboo.backend.domain.story.repository.TempUser;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.BadRequestException;
import com.abbboo.backend.global.error.exception.NotFoundException;
import com.abbboo.backend.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StoryServiceImpl implements StoryService{

    private final S3Util s3Util;
    private final TempUser tempUser;
    private final FamilyRepository familyRepository;
    private final StoryRepository storyRepository;
    private final ReactionRepository reactionRepository;
    private final ReactionHistoryRepository reactionHistoryRepository;

    @Override
    @Transactional
    public void createStroy(MultipartFile storyFile) {
        log.info("story 등록 서비스 : {} ",storyFile.getSize());
        // TODO: user 받아오기

        // 파일 확인
        if (storyFile.isEmpty()){
            throw new BadRequestException(ErrorCode.FILE_IS_NULL);
        }

        // TODO: s3 폴더 코드를 프론트에서 받는 게 나은가? 여기에 코드 하드코딩하면 yml로 관리하는 게 의미없지 않나..
        String fileUrl = s3Util.uploadFile(storyFile, 0);

        // 임시 user 데이터
        User user = tempUser.findById(1L).orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        Story story = Story.builder()
            .user(user)
            .url(fileUrl)
            .build();

        storyRepository.save(story);
    }

    @Override
    @Transactional
    public void updateIsSaved(Long storyId) {
        // id로 story 가져오기
        Story story = storyRepository.findById(storyId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.STORY_NOT_FOUND));
        // story isSaved 값 변경
        log.info("원래 isSaved : {}",story.getIsSaved());
        story.changeIsSaved();
        log.info("변경 isSaved : {}",story.getIsSaved());
    }

    @Override
    @Transactional
    public void createReaction(StoryReactionReq reactionReq, Long storyId) {
        String expression = reactionReq.getExpression();
        // expression으로 reaction 가져오기
        Reaction reaction = reactionRepository.findByExpression(expression);
        if(reaction == null){ // 예외처리
            throw new BadRequestException(ErrorCode.REACTION_IS_WRONG);
        }
        log.info("반응 등록 서비스 :: reaction id: {} - {}", reaction.getId(), expression);

        // storyId로 story 가져오기
        Story story = storyRepository.findById(storyId)
            .orElseThrow(()->new NotFoundException(ErrorCode.STORY_NOT_FOUND));

        // TODO : User 가져오기
        User user = tempUser.findById(1L).orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // reaction_history에 저장
        ReactionHistory reactionHistory = ReactionHistory.builder()
            .reaction(reaction).story(story).user(user)
            .build();

        reactionHistoryRepository.save(reactionHistory);
    }

    @Override
    public DayStoryListRes readDayStory(StoriesReq storiesReq) {
        // familyId로 24시간이내 소식 조회하기
        int familyId = storiesReq.getFamilyId();

        // 예외 1 - familyId가 유효하지 않은 경우
        familyRepository.findById(familyId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.FAMILY_NOT_FOUND));

        return storyRepository.findDayStoriesByFamilyId(familyId);
    }
}
