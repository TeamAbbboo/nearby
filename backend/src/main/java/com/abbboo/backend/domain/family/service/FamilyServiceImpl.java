package com.abbboo.backend.domain.family.service;

import com.abbboo.backend.domain.family.dto.res.FamilyGenerateRes;
import com.abbboo.backend.domain.family.dto.res.FamilyCodeCheckRes;
import com.abbboo.backend.domain.family.entity.Family;
import com.abbboo.backend.domain.family.repository.FamilyRepository;
import com.abbboo.backend.domain.user.entity.User;
import com.abbboo.backend.domain.user.repository.UserRepository;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.AlreadyExistException;
import com.abbboo.backend.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FamilyServiceImpl implements FamilyService {

    private final UserRepository userRepository;
    private final FamilyRepository familyRepository;

    // 가족 생성
    @Override
    @Transactional
    public FamilyGenerateRes createFamily(String kakaoId) {

        // 유저 조회
        User user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));
        
        // 해당 유저 가족 조회
        if(user.getFamily()!=null)
            throw new AlreadyExistException(ErrorCode.USER_EXIST_FAMILY);

        // 가족 코드 생성
        String familyCode = createFamilyCode();

        log.info("가족 코드 생성 : OK");

        // 가족 생성
        Family family = Family.builder()
                .familyCode(familyCode)
                .build();

        // 해당 유저 가족 정보 수정
        user.changeFamily(family);

        familyRepository.save(family);

        // 가족 생성 응답 반환
        return FamilyGenerateRes.builder()
                .familyId(family.getId())
                .familyCode(family.getFamilyCode())
                .build();
    }

    // 가족 코드 조회
    @Override
    @Transactional(readOnly = true)
    public FamilyCodeCheckRes getFamilyCode(String kakaoId) {

        // 유저 조회
        User user = userRepository.findByKakaoId(kakaoId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 가족 코드 조회 응답 반환
        return FamilyCodeCheckRes.builder()
                .familyCode(user.getFamily()==null
                        ? null : user.getFamily().getFamilyCode())
                .build();
    }

    // 가족 코드 생성 메서드
    public String createFamilyCode() {

        // 생성된 가족 코드
        String createdfamilyCode;

        while(true) {
            
            createdfamilyCode = UUID.randomUUID().toString().substring(16,26).replace("-","");

            // 중복되지 않는 경우
            if(!familyRepository.existsByFamilyCode(createdfamilyCode))
                return createdfamilyCode;
        }
    }
}