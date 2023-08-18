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



    public MemberDTO save(MemberDTO memberDTO) {
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);

        // 비밀번호 암호화를 위해 MemberDTO.toMemberDTO 메서드 사용
        MemberDTO encryptedMemberDTO = MemberDTO.toMemberDTO(memberEntity, passwordEncoder);

        List<String> roles = authorityUtils.createRoles(memberDTO.getMemberId()); // Assuming you use memberId for email
        memberEntity.setRoles(roles);

        memberRepository.save(memberEntity);

        return encryptedMemberDTO; // 암호화된 비밀번호가 설정된 MemberDTO 반환
    }



    public MemberDTO login(MemberDTO memberDTO) {
        /*
            1. 회원이 입력한 이메일로 DB에서 조회를 함
            2. DB에서 조회한 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 판단
         */
        Optional<MemberEntity> byMemberId = memberRepository.findByMemberId(memberDTO.getMemberId());
        if (byMemberId.isPresent()) {
            // 조회 결과가 있다(해당 이메일을 가진 회원 정보가 있다)
            MemberEntity memberEntity = byMemberId.get();
            if (memberEntity.getPassword() != null && memberEntity.getPassword().equals(memberDTO.getPassword())) {
                // 비밀번호 일치
                // entity -> dto 변환 후 리턴
                MemberDTO dto = MemberDTO.toMemberDTO(memberEntity, passwordEncoder);
                return dto;
            } else {
                // 비밀번호 불일치(로그인실패)
                return null;
            }
        } else {
            // 조회 결과가 없다(해당 이메일을 가진 회원이 없다)
            return null;
        }

    }

    public List<MemberDTO> findAll() {
        List<MemberEntity> memberEntityList = memberRepository.findAll();
        List<MemberDTO> memberDTOList = new ArrayList<>();
        for (MemberEntity memberEntity: memberEntityList) {
            memberDTOList.add(MemberDTO.toMemberDTO(memberEntity, passwordEncoder));

        }
        return memberDTOList;
    }

    public MemberDTO findById(Long id) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(id);
        if (optionalMemberEntity.isPresent()) {

            return MemberDTO.toMemberDTO(optionalMemberEntity.get(), passwordEncoder);
        } else {
            return null;
        }

    }

    public MemberDTO updateForm(String myId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByMemberId(myId);
        if (optionalMemberEntity.isPresent()) {
            return MemberDTO.toMemberDTO(optionalMemberEntity.get(), passwordEncoder);
        } else {
            return null;
        }
    }

    public void update(MemberDTO memberDTO) {
        memberRepository.save(MemberEntity.toUpdateMemberEntity(memberDTO));
    }

    public void deleteById(Long id) {
        memberRepository.deleteById(id);
    }



}
