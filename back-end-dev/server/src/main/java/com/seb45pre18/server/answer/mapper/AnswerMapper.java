package com.seb45pre18.server.answer.mapper;


import com.seb45pre18.server.answer.dto.AnswerDto;
import com.seb45pre18.server.answer.entity.Answer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AnswerMapper {

    public Answer answerPostToAnswer(AnswerDto.post requestBody){
        if(requestBody == null) return null;

        Answer answer = new Answer();
        answer.setNickname(requestBody.getNickname());
        answer.setContent(requestBody.getContent());

        return answer;
    }

    public Answer answerPatchToAnswer(AnswerDto.Patch requestBody) {
        if (requestBody == null) return null;

        Answer answer = new Answer();
        answer.setAnswerId(requestBody.getAnswerId());
        answer.setContent(requestBody.getContent());

        return answer;

    }

    public AnswerDto.response answerToAnswerResponse(Answer answer) {
        AnswerDto.response response = new AnswerDto.response(
                answer.getAnswerId(),
                answer.getMember().getMemberId(),
                answer.getQuestion().getQuestionId(),
                answer.getContent(),
                answer.getMember().getNickname(),
                answer.getCreatedAt()
        );
        return response;
    }
}
