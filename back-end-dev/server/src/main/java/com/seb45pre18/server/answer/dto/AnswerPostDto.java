package com.seb45pre18.server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnswerPostDto {
    private Long id;
    private String memberId;
    private Long questionId;
    private String content;

}
