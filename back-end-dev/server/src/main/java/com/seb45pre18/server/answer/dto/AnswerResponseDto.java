package com.seb45pre18.server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class AnswerResponseDto {
    private Long answerId;
    private Long Id;
    private Long questionId;
    private String memberId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
