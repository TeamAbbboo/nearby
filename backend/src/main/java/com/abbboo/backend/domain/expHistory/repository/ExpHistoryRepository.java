package com.abbboo.backend.domain.expHistory.repository;

import com.abbboo.backend.domain.expHistory.entity.ExpHistory;
import com.abbboo.backend.domain.expHistory.dto.res.ExpHistoryDto;
import com.abbboo.backend.domain.user.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;


public interface ExpHistoryRepository extends JpaRepository<ExpHistory,Long> {
    //우리 가족의 경험치 기록 페이지
    @Query("select new com.abbboo.backend.domain.expHistory.dto.res.ExpHistoryDto" +
            "(e.id,e.user.id,e.level,e.point,e.content,e.createdAt) " +
            "from ExpHistory e where e.user.family.id= :familyId")
    Slice<ExpHistoryDto> findAllByFamilyId(@Param("familyId") int familyId, Pageable pageable);

    // 현재 레벨에서의 합
    @Query("select sum(e.point) from ExpHistory e where e.user.family.id= :familyId and e.level= e.user.family.level")
    Optional<Integer> getCurrentSum(@Param("familyId") Integer familyId);



    Boolean existsByUserAndCreatedAtBetweenAndContentLike(User user,
                                                          LocalDateTime from,
                                                          LocalDateTime to,
                                                          String contentLike);
}
