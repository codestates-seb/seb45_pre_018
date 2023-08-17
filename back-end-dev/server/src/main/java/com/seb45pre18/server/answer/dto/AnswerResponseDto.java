package com.seb45pre18.server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class AnswerResponseDto {
    private Long answerId;
    private Long memberId;
    private Long questionId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


}
