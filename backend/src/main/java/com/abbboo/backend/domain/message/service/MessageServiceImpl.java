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
import com.abbboo.backend.global.event.ExpEventFactory;
import com.abbboo.backend.global.event.NotificationEventFactory;
import com.abbboo.backend.global.util.ClovaUtil;
import com.abbboo.backend.global.util.S3Util;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
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
    private final ClovaUtil clovaUtil;
    private final S3Util s3Util;
    private final ApplicationEventPublisher eventPublisher;

    @Value("${notification.auto.user}")
    private String notificationAutoUser;

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

        // 경험치 추가 이벤트 발생
        if(req.getContent().length()>=20) {
            eventPublisher.publishEvent(ExpEventFactory.createLetterEvent(this, sender));
        }

        // 메시지 수신 알림 이벤트 발생
        eventPublisher.publishEvent(NotificationEventFactory.createLetterEvent(this,sender,receiver));
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

        // 페이징
        PageRequest pageRequest = PageRequest.of(req.getPage(), req.getSize(), Sort.by(Direction.DESC,"createdAt"));

        return messageRepository.findSentMessage(userId, pageRequest);
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

        // 페이징
        PageRequest pageRequest = PageRequest.of(req.getPage(), req.getSize(), Sort.by(Direction.DESC, "createdAt"));

        Slice<ReceivedMessageRes> receivedMessages = messageRepository.findReceivedMessage(userId, pageRequest);

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

        int userId = receiver.getId();

        log.info("사용자 정보 조회 성공: id - {}", receiver.getId());

        return messageRepository.findUnreadMessage(userId);
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

    @Transactional
    @Override
    public void sendMessage(User sender, User receiver, String content) {

        log.info("유저 정보 : {}", receiver.getId());
        log.info("유저 FCM TOKEN 여부 : {}"
                ,receiver.getFcmToken().isBlank());

        String ttsUrl = "";
        // naver clova에 tts 파일 변환 요청
        try {
            log.info("tts 파일 요청 시작");
            ttsUrl = s3Util.uploadFile(clovaUtil.createTTS(content), 1);
            log.info("tts 파일 요청 완료");
        } catch (Exception e) {
            log.info("exception");
            throw new RuntimeException(e);
        }

        Message message = Message.builder()
            .sender(sender).receiver(receiver).content(content)
            .ttsUrl(ttsUrl)
            .isAuto(true)
            .build();

        messageRepository.save(message);

        // 자동 메시지 유저 불러오기
        User auto = userRepository.findById(Integer.valueOf(notificationAutoUser))
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 메시지 수신 알림 이벤트 발생
        eventPublisher.publishEvent(NotificationEventFactory.createLetterEvent(this,sender,receiver));
        eventPublisher.publishEvent(NotificationEventFactory.createAutoLetterEvent(this,auto,sender));
    }

    // 랜덤 메시지 세팅 (조회된 사용자의 가족 랜덤 조회, 메시지 랜덤 조회)
    @Override
    public void setRandomMessage(Integer senderId) {

        // 조회된 사용자의 가족 id 찾기
        User sender = userRepository.findById(senderId).orElse(null);
        if(sender == null) return;
        Integer familyId = sender.getFamily().getId();

        // 같은 familyId 중에서 senderId를 제외한 구성원 Id 하나 찾기
        Integer receiverId = userRepository.findRandomUser(familyId, senderId).orElse(null);
        if(receiverId == null) return;    // 가족 id는 있지만 가족이 없는 경우
        User receiver = userRepository.findById(receiverId).orElse(null);
        if(receiver == null) return;
        log.info("가족 구성원 중 랜덤 조회 완료 : {}", receiver.getNickname());

        // 메시지 템플릿 디비에서 랜덤 조회
        String content = messageRepository.findRandeomTemplate();

        // 템플릿에 sender, receiver를 replace
        content = content.replace("{sender}", sender.getNickname())
            .replace("{receiver}", receiver.getNickname());

        // TODO: refactoring 필요
        sendMessage(sender, receiver, content);
    }
}
