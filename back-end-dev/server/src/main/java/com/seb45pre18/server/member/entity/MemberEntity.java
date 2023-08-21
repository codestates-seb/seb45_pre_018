package com.seb45pre18.server.member.entity;

import com.seb45pre18.server.member.dto.MemberDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "member_table")
public class MemberEntity {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private Long id;

    @Column(nullable = false,updatable = false,unique = true) // unique 제약조건 추가
    private String memberId;

    @Column(length = 100,nullable = false)
    private String password;

    @Column(length = 4,nullable = false)
    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public static MemberEntity toMemberEntity(MemberDTO memberDTO) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setId(memberDTO.getId());
        memberEntity.setMemberId(memberDTO.getMemberId());
        memberEntity.setPassword(memberDTO.getPassword());
        memberEntity.setName(memberDTO.getName());
        return memberEntity;
    }

    public static MemberEntity toUpdateMemberEntity(MemberDTO memberDTO) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setId(memberDTO.getId());
        memberEntity.setMemberId(memberDTO.getMemberId());
        memberEntity.setPassword(memberDTO.getPassword());
        memberEntity.setName(memberDTO.getName());
        return memberEntity;
    }

}
