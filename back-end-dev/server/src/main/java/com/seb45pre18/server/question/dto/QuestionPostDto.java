package com.seb45pre18.server.question.dto;

import com.seb45pre18.server.member.entity.MemberEntity;
import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class QuestionPostDto {
    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private String expect;

    @Nullable
    private String tags;

    @Positive
    private long memberId;

    public MemberEntity getMember() {
        MemberEntity member = new MemberEntity();
        member.setId(memberId);
        return member;
    }
}
