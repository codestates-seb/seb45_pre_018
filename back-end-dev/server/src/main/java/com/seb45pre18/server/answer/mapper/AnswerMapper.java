package com.seb45pre18.server.answer.mapper;


import com.seb45pre18.server.answer.dto.AnswerPatchDto;
import com.seb45pre18.server.answer.dto.AnswerPostDto;
import com.seb45pre18.server.answer.dto.AnswerResponseDto;
import com.seb45pre18.server.answer.entity.Answer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class AnswerMapper {

    public Answer answerPostToAnswer(AnswerPostDto requestBody) {
        if (requestBody == null) return null;

        Answer answer = new Answer();
        answer.setContent(requestBody.getContent());

        return answer;
    }

    public Answer answerPatchToAnswer(AnswerPatchDto requestBody) {
        if (requestBody == null) return null;

        Answer answer = new Answer();
        answer.setAnswerId(requestBody.getAnswerId());
        answer.setContent(requestBody.getContent());

        return answer;

    }


    public AnswerResponseDto answerToAnswerResponse(Answer answer) {

        AnswerResponseDto response = new AnswerResponseDto(
                answer.getAnswerId(),
                answer.getMemberId(),
                answer.getQuestionId(),
                answer.getContent(),
                answer.getCreatedAt(),
                answer.getModifiedAt()
        );
        return response;
    }
}
