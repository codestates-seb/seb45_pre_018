package com.seb45pre18.server.member.dto;

import com.seb45pre18.server.member.entity.MemberEntity;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberDTO {
    private Long id;
    @NotBlank
    @Size(max = 8)
    private String memberId;
    @NotBlank
    @Size(max = 100)
    private String password;
    @NotBlank
    @Size(max = 5)
    private String name;

    //    MemberEntity 객체를 MemberDTO로 변환하는 메서드
    public static MemberDTO toMemberDTO(MemberEntity memberEntity, PasswordEncoder passwordEncoder) {

//      새로운 MemberDTO 객체 생성
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(memberEntity.getId());
        memberDTO.setMemberId(memberEntity.getMemberId());
        memberDTO.setName(memberEntity.getName());

        String password = memberEntity.getPassword();
        if (password != null) {
//          비밀번호를 암호화 하여 MemberDTO에 저장
            memberDTO.setPassword(passwordEncoder.encode(password));
        }

        return memberDTO;
    }


}
