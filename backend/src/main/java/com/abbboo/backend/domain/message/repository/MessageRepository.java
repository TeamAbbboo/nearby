package com.abbboo.backend.domain.message.repository;

import com.abbboo.backend.domain.message.dto.res.ReceivedMessageRes;
import com.abbboo.backend.domain.message.dto.res.SentMessageRes;
import com.abbboo.backend.domain.message.entity.Message;
import java.util.Optional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // 가족들에게 보낸 메시지 조회
    @Query("select new com.abbboo.backend.domain.message.dto.res.SentMessageRes(" +
            "u.id, u.nickname, u.mood, m.content, m.createdAt)" +
            "from Message m join User u on u.id = m.receiver.id " +
            "where m.sender.id= :senderId and u.family.id= :familyId")
    Slice<SentMessageRes> findSentMessage(@Param("senderId") int senderId,
        @Param("familyId") Optional<Integer> familyId, PageRequest pageRequest);

    // 가족들에게 받은 메시지 조회
    @Query("select new com.abbboo.backend.domain.message.dto.res.ReceivedMessageRes(" +
            "m.id, u.id, u.nickname, u.mood, m.content, m.createdAt, m.isRead, m.ttsUrl)" +
            "from Message m join User u on u.id = m.sender.id " +
            "where m.receiver.id= :receiverId and u.family.id= :familyId")
    Slice<ReceivedMessageRes> findReceivedMessage(@Param("receiverId") int receiverId,
        @Param("familyId") Optional<Integer> familyId, PageRequest pageRequest);

    // 읽지 않은 메시지 중 가장 최근 메시지 조회
    @Query("select new com.abbboo.backend.domain.message.dto.res.ReceivedMessageRes(" +
        "m.id,u.id, u.nickname, u.mood, m.content, m.createdAt, m.isRead, m.ttsUrl)" +
        "from Message m join User u on u.id = m.sender.id " +
        "where m.receiver.id= :receiverId and u.family.id= :familyId and m.isRead = false " +
        "order by m.createdAt limit 1")
    ReceivedMessageRes findUnreadMessage(@Param("receiverId") int receiverId,
        @Param("familyId") Optional<Integer> familyId);
}
