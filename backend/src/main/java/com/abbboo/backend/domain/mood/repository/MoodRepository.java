package com.abbboo.backend.domain.mood.repository;

import com.abbboo.backend.domain.mood.entity.Mood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoodRepository extends JpaRepository<Mood, Integer> {

    Mood findByExpressionAndIsDeletedFalse(String mood);
}
