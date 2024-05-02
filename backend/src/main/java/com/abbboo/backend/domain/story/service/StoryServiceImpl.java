package com.abbboo.backend.domain.story.service;

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
    private final StoryRepository storyRepository;

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
}
