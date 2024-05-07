package com.abbboo.backend.domain.expHistory.service;

import com.abbboo.backend.domain.expHistory.entity.res.GetExpHistoryRes;
import com.abbboo.backend.domain.expHistory.repository.ExpHistoryRepository;
import com.abbboo.backend.domain.family.repository.FamilyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class ExpHistoryServiceImpl implements ExpHistoryService{
    private final FamilyRepository familyRepository;
    private final ExpHistoryRepository expHistoryRepository;
    @Override
    public GetExpHistoryRes getExpHistory(int userId) {
        //TODO: familyRepository.findByUserId 만들어 적용
        int familyId=1;
        return null;
    }
}

