package com.seb45pre18.server.question.dto;

import com.seb45pre18.server.answer.dto.AnswerResponseDto;
import com.seb45pre18.server.answer.entity.Answer;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class QuestionResponseDto {
    private long questionId;
    private String title;
    private String content;
    private String expect;
    private String tags;
    private String memberId;
    private Integer view;
    private Integer answer_count;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<AnswerResponseDto> answers;
}
