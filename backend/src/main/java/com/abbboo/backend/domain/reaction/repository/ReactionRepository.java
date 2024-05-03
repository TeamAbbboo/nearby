package com.abbboo.backend.domain.reaction.repository;

import com.abbboo.backend.domain.reaction.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {

    Reaction findByExpression(String expression);

}
