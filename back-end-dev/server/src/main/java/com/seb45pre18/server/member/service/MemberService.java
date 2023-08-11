package com.seb45pre18.server.member.service;

import com.seb45pre18.server.member.dto.MemberDTO;
import com.seb45pre18.server.member.entity.MemberEntity;
import com.seb45pre18.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    public void save(MemberDTO memberDTO) {
        //1. dto -> entity  변환
        //2. repository save 메서드 호출
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
        //repository save메서드 호출 (조건. entity객체를 넘겨줘야 함)

    }
    public  MemberDTO login(MemberDTO memberDTO){
        /*

        1.회원이 입력한 아이디로 DB에서 조회
        2.DB에서 조회한 비밀번호와 사용자가 입력한 비밀번호 일치 판단
         */

        Optional<MemberEntity> byMemberId =memberRepository.findByMemberId(String.valueOf(memberDTO.getId()));
        if(byMemberId.isPresent()){
            //조회결과 있음(해당 아이디를 가진 회원정보 있음)
            MemberEntity memberEntity = byMemberId.get();

            if(memberEntity.getMemberPassword().equals(memberDTO.getMemberPassword())){
                //비밀번호 일치
                //entity -> dto 변환 후 리턴
                MemberDTO dto = MemberDTO.toMemberDTO(memberEntity);
                return  dto;

            }
            else{
                //비밀번호 불일치
                return null;
            }
        }
        else {
            //조회결과 X
            return null;
        }
    }
}
