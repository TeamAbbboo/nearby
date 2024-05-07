package com.abbboo.backend.domain.message.repository;

import com.abbboo.backend.domain.message.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
