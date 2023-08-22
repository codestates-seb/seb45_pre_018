package com.seb45pre18.server.member.repository;

import com.seb45pre18.server.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    // 아이디로 회원 정보 조회
    Optional<MemberEntity> findByMemberId(String memberId);
    @Modifying
    @Transactional
    @Query("UPDATE MemberEntity m SET m.password = :newPassword WHERE m.id = :id")
    void updatePassword(Long id, String newPassword);
}
