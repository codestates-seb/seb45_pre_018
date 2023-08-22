package com.seb45pre18.server.member.service;

import com.seb45pre18.server.member.auth.utils.CustomAuthorityUtils;
import com.seb45pre18.server.member.dto.MemberDTO;
import com.seb45pre18.server.member.entity.MemberEntity;
import com.seb45pre18.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;


    //  회원가입 메서드
    public MemberDTO save(MemberDTO memberDTO) {
//        DTO -> Entity로 변환 후 암호화된 비밀번호 설정한 뒤 저장
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO,passwordEncoder);
//      회원역할 생성
        List<String> roles = authorityUtils.createRoles(memberDTO.getMemberId());
        memberEntity.setRoles(roles);
//      저장 후 저장된 엔티티로 MemberDTO 반환
        memberRepository.save(memberEntity);
        return MemberDTO.toMemberDTO(memberEntity,passwordEncoder);
    }


    //  로그인 메서드
    public MemberDTO login(MemberDTO memberDTO) {

        Optional<MemberEntity> byMemberId = memberRepository.findByMemberId(memberDTO.getMemberId());
        if (byMemberId.isPresent()) {
            // 조회 결과가 있다(해당 아이디 가진 회원 정보가 있다)
            MemberEntity memberEntity = byMemberId.get();
            if (passwordEncoder.matches(memberDTO.getPassword(),memberEntity.getPassword())) {
                //System.out.println("실행");
                // 비밀번호 일치
                // entity -> dto 변환 후 리턴
                MemberDTO dto = MemberDTO.toMemberDTO(memberEntity, passwordEncoder);
                return dto;
            } else {
                // 비밀번호 불일치(로그인실패)
                return null;
            }
        } else {
            // 조회 결과가 없다(해당 아이디를 가진 회원이 없다)
            return null;
        }

    }
    //  전체회원 조회 메서드
    public List<MemberDTO> findAll() {
        List<MemberEntity> memberEntityList = memberRepository.findAll();
        List<MemberDTO> memberDTOList = new ArrayList<>();
        for (MemberEntity memberEntity: memberEntityList) {
            memberDTOList.add(MemberDTO.toMemberDTO(memberEntity, passwordEncoder));

        }
        return memberDTOList;
    }
    //     회원 ID로 회원정보 조회 메서드
    public MemberDTO findById(Long id) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(id);
        if (optionalMemberEntity.isPresent()) {

            return MemberDTO.toMemberDTO(optionalMemberEntity.get(), passwordEncoder);
        } else {
            return null;
        }

    }
    //  회원정보 수정 폼 조회 메서드
    public MemberDTO updateForm(String memberId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByMemberId(memberId);
        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
            MemberDTO memberDTO = MemberDTO.toMemberDTO(memberEntity, passwordEncoder);
            return memberDTO;
        } else {
            return null;
        }
    }



    //  회원정보 업데이트 메서드
    public void update(MemberDTO memberDTO) {
        if (memberDTO != null) {
            Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberDTO.getId());
            if (optionalMemberEntity.isPresent()) {
                MemberEntity existingMemberEntity = optionalMemberEntity.get();

                String newPassword = memberDTO.getPassword(); // 새로운 비밀번호 가져오기
                if (newPassword != null && !newPassword.isEmpty()) {//.isEmpty 추가후 해결됨
                    if(!passwordEncoder.matches(newPassword, existingMemberEntity.getPassword())) {

                        // 새로운 비밀번호와 기존 비밀번호 다르면 업데이트 수행
                        String encodedPassword = passwordEncoder.encode(newPassword);
                        existingMemberEntity.setPassword(encodedPassword);
                    }
                }
                // 나머지 정보 업데이트
                existingMemberEntity.setName(memberDTO.getName());
                memberRepository.save(existingMemberEntity);

            }
        }
    }

    //        회원정보 삭제 메서드
    public void deleteById(Long id) {
        memberRepository.deleteById(id);
    }



}

