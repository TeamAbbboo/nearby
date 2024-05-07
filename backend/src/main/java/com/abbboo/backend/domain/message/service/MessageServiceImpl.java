package com.abbboo.backend.domain.message.service;

import com.abbboo.backend.domain.message.dto.req.SendMessageReq;
import com.abbboo.backend.domain.message.entity.Message;
import com.abbboo.backend.domain.message.repository.MessageRepository;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.BadRequestException;
import com.abbboo.backend.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
