package com.abbboo.backend.domain.reaction.repository;

import com.abbboo.backend.domain.reaction.entity.Reaction;
import com.abbboo.backend.domain.story.dto.res.ReactionRes;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {

    Reaction findByExpression(String expression);

    @Query("select new com.abbboo.backend.domain.story.dto.res.ReactionRes("
        + "u.mood, u.decoration, u.nickname, r.expression, h.createdAt) "
        + "from ReactionHistory h "
        + "join User u on h.user.id = u.id join Reaction r on h.reaction.id = r.id "
        + "where h.story.id= :storyId "
        + "order by h.createdAt desc")
    List<ReactionRes> findByStoryId(@Param("storyId") Long storyId);
}
