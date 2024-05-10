package com.abbboo.backend.domain.expHistory.service;

import com.abbboo.backend.domain.expHistory.dto.req.LevelUpReq;
import com.abbboo.backend.domain.expHistory.dto.res.ExpHistoryDto;
import com.abbboo.backend.domain.expHistory.dto.res.GetExpHistoryRes;
import com.abbboo.backend.domain.expHistory.repository.ExpHistoryRepository;
import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.family.repository.FamilyRepository;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.base.PagenationReq;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.BadRequestException;
import com.abbboo.backend.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Service
public class ExpHistoryServiceImpl implements ExpHistoryService{
    private final FamilyRepository familyRepository;
    private final ExpHistoryRepository expHistoryRepository;
    private final UserRepository userRepository;
    @Override
    @Transactional(readOnly = true)
    public GetExpHistoryRes getExpHistory(String kakaoId, PagenationReq pagenationReq) {
        int familyId=familyRepository.findByKakaoId(kakaoId).orElseThrow(()->new NotFoundException(ErrorCode.FAMILY_NOT_FOUND));


        Pageable pageable=PageRequest.of(pagenationReq.getPage(), pagenationReq.getSize(), Sort.by(Sort.Direction.DESC,"createdAt"));
        Slice<ExpHistoryDto> hitories=expHistoryRepository.findAllByFamilyId(familyId,pageable);

        int sum= expHistoryRepository.getCurrentSum(familyId).orElse(0);
        return new GetExpHistoryRes(sum,hitories);
    }

    @Override
    @Transactional
    public void updateLevel(String kakaoId, LevelUpReq levelUpReq) {
        int familyId=familyRepository.findByKakaoId(kakaoId).orElseThrow(()->new NotFoundException(ErrorCode.FAMILY_NOT_FOUND));
        Family family= familyRepository.findById(familyId).get();
        //현재 db와 다른 값이 들어올
        if(family.getLevel()!=levelUpReq.getLevel())
        {
            throw new BadRequestException(ErrorCode.LEVEL_IS_INVALID);
        }
        //경험치 충분한지 확인
        int sum=expHistoryRepository.getCurrentSum(familyId).orElse(0);
        int familyCount=userRepository.countByFamilyAndIsDeletedFalse(family);
        if(sum<familyCount*10*levelUpReq.getLevel())
        {
            throw new BadRequestException(ErrorCode.LACK_OF_EXP);
        }
        family.updateLevel(levelUpReq.getLevel()+1);
    }
}


