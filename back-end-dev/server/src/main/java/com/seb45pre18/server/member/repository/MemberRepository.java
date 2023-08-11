package com.seb45pre18.server.member.repository;

import com.seb45pre18.server.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
}
