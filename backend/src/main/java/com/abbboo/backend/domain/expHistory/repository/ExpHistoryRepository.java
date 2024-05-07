package com.abbboo.backend.domain.expHistory.repository;

import com.abbboo.backend.domain.expHistory.entity.ExpHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpHistoryRepository extends JpaRepository<ExpHistory,Long> {

}
