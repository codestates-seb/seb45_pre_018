package com.seb45pre18.server.member.repository;

import com.seb45pre18.server.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    // id로 회원 정보 조회
    Optional<MemberEntity> findByMemberId(String memberId);
}
