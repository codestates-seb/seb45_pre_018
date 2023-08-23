package com.seb45pre18.server.member.dto;

import com.seb45pre18.server.member.entity.MemberEntity;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberDTO {
    private Long id;
    @NotBlank
    private String memberId;
    @NotBlank
    private String password;
    @NotBlank
    private String name;

    public static MemberDTO toMemberDTO(MemberEntity memberEntity, PasswordEncoder passwordEncoder) {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(memberEntity.getId());
        memberDTO.setMemberId(memberEntity.getMemberId());
        String password = memberEntity.getPassword();
        if(password != null){
            memberDTO.setPassword(passwordEncoder.encode(password));
        }
        memberDTO.setName(memberEntity.getName());
        return memberDTO;
    }

}
