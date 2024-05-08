package com.abbboo.backend.domain.message.service;

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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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

    // 메시지 전송
    @Override
    @Transactional
    public void createMessage(String kakaoId, SendMessageReq req) {

        // 발신자와 수신자가 유효한 사용자인지 확인
        User sender = userRepository.findById(req.getSenderId())
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

        Message message = Message.builder()
            .sender(sender).receiver(receiver).content(req.getContent())
            .build();

        messageRepository.save(message);
    }

    // 가족에게 보낸 메시지 조회
    @Override
    public Slice<SentMessageRes> findSentMessage(String kakaoId, PagenationReq req) {

        // sender 조건에 들어갈 사용자 정보
        User sender = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        log.info("보낸 사람 정보 조회 성공: id - {}", sender.getId());
        int userId = sender.getId();
        int familyId = sender.getFamily().getId();

        // 페이징
        PageRequest pageRequest = PageRequest.of(req.getPage(), req.getSize(), Sort.by(Direction.ASC,"createdAt"));

        return messageRepository.findSentMessage(userId, familyId, pageRequest);
    }

    // 가족에게 받은 메시지 조회
    @Override
    public Slice<ReceivedMessageRes> findReceivedMessage(String kakaoId, PagenationReq req) {

        // receiver 조건에 들어갈 사용자 정보
        User receiver = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        log.info("받은 사람 정보 조회 성공: id - {}", receiver.getId());
        int userId = receiver.getId();
        int familyId = receiver.getFamily().getId();

        // 페이징
        PageRequest pageRequest = PageRequest.of(req.getPage(), req.getSize(), Sort.by(Direction.ASC, "createdAt"));

        return messageRepository.findReceivedMessage(userId, familyId, pageRequest);
    }
}
