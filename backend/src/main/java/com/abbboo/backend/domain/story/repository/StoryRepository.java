package com.abbboo.backend.domain.story.repository;

import com.abbboo.backend.domain.story.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long>, StoryRepositoryQuerydsl {

    // 가장 최근에 등록한 스토리 조회
    Story findTop1ByUserIdOrderByCreatedAtDesc(Integer userId);
}
