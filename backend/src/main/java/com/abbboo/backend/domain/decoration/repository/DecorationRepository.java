package com.abbboo.backend.domain.decoration.repository;

import com.abbboo.backend.domain.decoration.entity.Decoration;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DecorationRepository extends JpaRepository<Decoration, Integer> {

    Optional<Decoration> findByItemAndIsDeletedFalse(String item);

}
