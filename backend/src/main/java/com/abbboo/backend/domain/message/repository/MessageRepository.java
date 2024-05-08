package com.abbboo.backend.domain.message.repository;

import com.abbboo.backend.domain.message.dto.res.ReceivedMessageRes;
import com.abbboo.backend.domain.message.dto.res.SentMessageRes;
import com.abbboo.backend.domain.message.entity.Message;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // 가족들에게 보낸 메시지 조회
    @Query("select new com.abbboo.backend.domain.message.dto.res.SentMessageRes(" +
            "u.id, u.nickname, u.mood, m.content, m.createdAt)" +
            "from User u join Message m on u.id = m.receiver.id " +
            "where m.sender.id= :senderId and u.family.id= :familyId")
    Slice<SentMessageRes> findSentMessage(@Param("senderId") int senderId,
        @Param("familyId") int familyId, PageRequest pageRequest);

    // 가족들에게 받은 메시지 조회
    @Query("select new com.abbboo.backend.domain.message.dto.res.ReceivedMessageRes(" +
            "u.id, u.nickname, u.mood, m.content, m.createdAt, m.isRead, m.ttsUrl)" +
            "from User u join Message m on u.id = m.sender.id " +
            "where m.receiver.id= :receiverId and u.family.id= :familyId")
    Slice<ReceivedMessageRes> findReceivedMessage(@Param("receiverId") int receiverId,
        @Param("familyId") int familyId, PageRequest pageRequest);
}
