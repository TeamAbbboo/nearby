package com.abbboo.backend.domain.mood.repository;

import com.abbboo.backend.domain.mood.entity.MoodHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoodHistoryRepository extends JpaRepository<MoodHistory, Long> {

}
