package com.seb45pre18.server.question.dto;

import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;

@Getter
public class QuestionPatchDto {
    private long questionId;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private String expect;

    @Nullable
    private String tags;

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }
}
