package com.seb45pre18.server.member.entity;

import com.seb45pre18.server.member.dto.MemberDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    @Column(nullable = false,updatable = false,unique = true,length = 8) // 아이디 5글자 제한
    private String memberId;

    @Column(length = 100,nullable = false)//비밀번호 8글자 제한
    private String password;

    @Column(length = 5,nullable = false)//이름 5글자 제한
    private String name;

    @ElementCollection(fetch = FetchType.EAGER) // 컬렉션 타입 필드를 선언, EAGER 전략으로 즉시 로딩
    private List<String> roles = new ArrayList<>(); // 회원 역할(role) 정보를 담는 컬렉션 필드
    @Transient
    private  PasswordEncoder passwordEncoder;
    // MemberDTO 객체를 기반으로 MemberEntity 객체를 생성하여 반환하는 메서드
    public static MemberEntity toMemberEntity(MemberDTO memberDTO, PasswordEncoder passwordEncoder) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setId(memberDTO.getId());
        memberEntity.setMemberId(memberDTO.getMemberId());
        memberEntity.setName(memberDTO.getName());

        // 입력된 비밀번호를 암호화하여 저장
        String encryptedPassword = passwordEncoder.encode(memberDTO.getPassword());
        memberEntity.setPassword(encryptedPassword);

        return memberEntity;
    }
    public void updatePassword(String newPassword){
        if(passwordEncoder !=null){
            setPassword(passwordEncoder.encode(newPassword));
        }
    }


}
