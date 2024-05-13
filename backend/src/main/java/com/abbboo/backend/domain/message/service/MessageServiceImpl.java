package com.abbboo.backend.domain.message.service;

import com.abbboo.backend.domain.family.repository.FamilyRepository;
import com.abbboo.backend.domain.message.dto.req.SendMessageReq;
import com.abbboo.backend.domain.message.dto.res.ReceivedMessageRes;
import com.abbboo.backend.domain.message.dto.res.SentMessageRes;
import com.abbboo.backend.domain.message.entity.Message;
import com.abbboo.backend.domain.message.repository.MessageRepository;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.base.PagenationReq;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.BadRequestException;
import com.abbboo.backend.global.error.exception.NotFoundException;
import com.abbboo.backend.global.util.ClovaUtil;
import com.abbboo.backend.global.util.S3Util;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MessageServiceImpl implements MessageService{

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final FamilyRepository familyRepository;
    private final ClovaUtil clovaUtil;
    private final S3Util s3Util;

    // 메시지 전송
    @Override
    @Transactional
    public void createMessage(String kakaoId, SendMessageReq req) {

        // 발신자와 수신자가 유효한 사용자인지 확인
        User sender = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        User receiver = userRepository.findById(req.getReceiverId())
            .orElseThrow(() -> new NotFoundException(ErrorCode.RECEIVER_NOT_FOUND));

        // 발신자와 수신자가 가족인지 확인
        if (!sender.getFamily().getId().equals(receiver.getFamily().getId())){
            throw new BadRequestException(ErrorCode.NOT_SAME_FAMILY);
        }

        // 메시지 길이가 100자 이내인지 확인
        if (req.getContent().length() > 100){
            throw new BadRequestException(ErrorCode.MESSAGE_LENGTH_EXCEEDED);
        }

        String ttsUrl = "";
        // naver clova에 tts 파일 변환 요청
        try {
            log.info("tts 파일 요청 시작");
            ttsUrl = s3Util.uploadFile(clovaUtil.createTTS(req.getContent()), 1);
            log.info("tts 파일 요청 완료");
        } catch (Exception e) {
            log.info("exception");
            throw new RuntimeException(e);
        }

        Message message = Message.builder()
            .sender(sender).receiver(receiver).content(req.getContent())
            .ttsUrl(ttsUrl)
            .build();

        messageRepository.save(message);
    }

    // 가족에게 보낸 메시지 조회
    @Override
    public Slice<SentMessageRes> findSentMessage(String kakaoId, PagenationReq req) {

        log.info("가족에게 보낸 메시지 조회 시작");
        // sender 조건에 들어갈 사용자 정보
        User sender = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        log.info("보낸 사람 정보 조회 성공: id - {}", sender.getId());

        int userId = sender.getId();
        Optional<Integer> familyId = familyRepository.findByKakaoId(kakaoId);

        // 페이징
        PageRequest pageRequest = PageRequest.of(req.getPage(), req.getSize(), Sort.by(Direction.DESC,"createdAt"));

        return messageRepository.findSentMessage(userId, familyId, pageRequest);
    }

    // 가족에게 받은 메시지 조회
    @Override
    @Transactional
    public Slice<ReceivedMessageRes> findReceivedMessage(String kakaoId, PagenationReq req) {

        log.info("가족에게 받은 메시지 조회 시작");
        // receiver 조건에 들어갈 사용자 정보
        User receiver = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        log.info("받은 사람 정보 조회 성공: id - {}", receiver.getId());
        
        int userId = receiver.getId();
        Optional<Integer> familyId = familyRepository.findByKakaoId(kakaoId);

        // 페이징
        PageRequest pageRequest = PageRequest.of(req.getPage(), req.getSize(), Sort.by(Direction.DESC, "createdAt"));

        Slice<ReceivedMessageRes> receivedMessages = messageRepository.findReceivedMessage(userId, familyId, pageRequest);

        // 안 읽은 메시지 찾기
        List<Message> messages = receiver.getReceivedMessages().stream()
            .filter(message -> !message.getIsRead())
            .toList();

        // 안 읽은 메시지 읽음 처리
        for (ReceivedMessageRes m : receivedMessages){

            // isRead == false -> true
            if(!m.getIsRead()){
                for(Message message : messages){
                    if(message.getId() == m.getMessageId()){
                        message.changeIsRead();
                    }
                }
            }
        }

        return receivedMessages;
    }

    // 읽지 않은 메시지 조회
    @Override
    public ReceivedMessageRes findUnreadMessage(String kakaoId) {
        
        // receiver 조건에 들어갈 사용자 정보
        log.info("사용자 정보 조회 시작");
        User receiver = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        log.info("사용자 정보 조회 성공: id - {}", receiver.getId());
        int userId = receiver.getId();
        Optional<Integer> familyId = familyRepository.findByKakaoId(kakaoId);

        return messageRepository.findUnreadMessage(userId, familyId);
    }

    // 메시지 읽음 처리
    @Override
    @Transactional
    public void updateMessageIsRead(String kakaoId, Long messageId) {
        // 해당 메시지 가져오기
        Message message = messageRepository.findById(messageId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.MESSAGE_NOT_FOUND));
        log.info("메시지 조회 성공!");

        // 요청한 사용자 가져오기
        User user = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        log.info("사용자 조회 성공!");

        // 요청한 사용자가 해당 메시지의 수신자가 맞는지 검증
        if(!message.getReceiver().getId().equals(user.getId())){
            throw new BadRequestException(ErrorCode.RECEIVER_NOT_CORRECT);
        }

        // 메시지의 isRead를 true로 변경
        message.changeIsRead();
    }
}
