package com.seb45pre18.server.answer.mapper;


import com.seb45pre18.server.answer.dto.AnswerPatchDto;
import com.seb45pre18.server.answer.dto.AnswerPostDto;
import com.seb45pre18.server.answer.dto.AnswerResponseDto;
import com.seb45pre18.server.answer.entity.Answer;
import com.seb45pre18.server.member.entity.MemberEntity;
import com.seb45pre18.server.question.entity.Question;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;


@Mapper(componentModel = "Spring")
public interface AnswerMapper {

    default Answer answerPostToAnswer(AnswerPostDto requestBody) {
        Answer answer = new Answer();
        MemberEntity memberEntity = new MemberEntity();
        Question question = new Question();


        System.out.println(requestBody.getId());
        System.out.println(requestBody.getQuestionId());
        System.out.println(requestBody.getMemberId());


        memberEntity.setId(requestBody.getId());
        memberEntity.setMemberId(requestBody.getMemberId());
        question.setQuestionId(requestBody.getQuestionId());


        answer.setMemberEntity(memberEntity);
        answer.setQuestion(question);
        answer.setMemberId(requestBody.getMemberId());
        answer.setContent(requestBody.getContent());


        return answer;
    }

    Answer answerPatchToAnswer(AnswerPatchDto requestBody);
//    {
//        if (requestBody == null) return null;
//
//        Answer answer = new Answer();
//        answer.setAnswerId(requestBody.getAnswerId());
//        answer.setContent(requestBody.getContent());
//
//        return answer;
//    }


    default AnswerResponseDto answerToAnswerResponse(Answer answer) {

        AnswerResponseDto response = new AnswerResponseDto(
                answer.getAnswerId(),
                answer.getId(),
                answer.getQuestionId(),
                answer.getMemberEntity().getMemberId(),
                answer.getContent(),
                answer.getCreatedAt(),
                answer.getModifiedAt()
        );
        return response;
    }
}
