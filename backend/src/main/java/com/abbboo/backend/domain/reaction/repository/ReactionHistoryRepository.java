package com.abbboo.backend.domain.reaction.repository;

import com.abbboo.backend.domain.reaction.entity.ReactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionHistoryRepository extends JpaRepository<ReactionHistory, Long> {
}
