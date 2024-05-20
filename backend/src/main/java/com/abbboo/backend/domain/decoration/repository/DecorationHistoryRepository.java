package com.abbboo.backend.domain.decoration.repository;

import com.abbboo.backend.domain.decoration.entity.DecorationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DecorationHistoryRepository extends JpaRepository<DecorationHistory, Long> {


}
