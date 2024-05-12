package com.abbboo.backend.domain.mood.repository;

import com.abbboo.backend.domain.mood.entity.Mood;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoodRepository extends JpaRepository<Mood, Integer> {

    Optional<Mood> findByExpressionAndIsDeletedFalse(String mood);
}
