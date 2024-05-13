package com.abbboo.backend.domain.story.repository;

import com.abbboo.backend.domain.story.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long>, StoryRepositoryQuerydsl {

}
