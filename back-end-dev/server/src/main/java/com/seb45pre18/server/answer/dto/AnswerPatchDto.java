package com.seb45pre18.server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnswerPatchDto {
    private Long answerId;
    private String content;
}
