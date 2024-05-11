package com.abbboo.backend.domain.decoration.repository;

import com.abbboo.backend.domain.decoration.entity.Decoration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DecorationRepository extends JpaRepository<Decoration, Integer> {

    Decoration findByExpression(String expression);

}
