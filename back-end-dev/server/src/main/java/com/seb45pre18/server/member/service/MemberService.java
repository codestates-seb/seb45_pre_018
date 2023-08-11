package com.seb45pre18.server.member.service;


import com.seb45pre18.server.member.dto.MemberDTO;
import com.seb45pre18.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    public void save(MemberDTO memberDTO) {
    }
}
