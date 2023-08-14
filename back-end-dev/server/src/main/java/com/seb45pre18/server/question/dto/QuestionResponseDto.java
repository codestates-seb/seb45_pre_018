package com.seb45pre18.server.question.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class QuestionResponseDto {
    private long questionId;
    private String title;
    private String content;
    private Integer view;
    private LocalDateTime createdAt;
}
