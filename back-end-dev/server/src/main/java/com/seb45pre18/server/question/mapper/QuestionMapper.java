package com.seb45pre18.server.question.mapper;

import com.seb45pre18.server.member.entity.MemberEntity;
import com.seb45pre18.server.member.service.MemberService;
import com.seb45pre18.server.question.dto.QuestionPatchDto;
import com.seb45pre18.server.question.dto.QuestionPostDto;
import com.seb45pre18.server.question.dto.QuestionResponseDto;
import com.seb45pre18.server.question.entity.Question;
import org.mapstruct.Mapper;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
//    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
//    QuestionResponseDto questionToQuestionResponseDto(Question question);
    List<QuestionResponseDto> questionsToQuestionResponseDtos(List<Question> questions);

    default Question questionPostDtoToQuestion(QuestionPostDto questionPostDto) {
        Question question = new Question();
        MemberEntity member = new MemberEntity();
        member.setId(questionPostDto.getMemberId());

        question.setTitle( questionPostDto.getTitle() );
        question.setContent( questionPostDto.getContent() );
        question.setExpect( questionPostDto.getExpect() );
        question.setAnswer_count( question.getAnswer_count() );
        question.setMember(member);

        return question;
    }

    default QuestionResponseDto questionToQuestionResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDto.QuestionResponseDtoBuilder questionResponseDto = QuestionResponseDto.builder();

        if ( question.getQuestionId() != null ) {
            questionResponseDto.questionId( question.getQuestionId() );
        }
        questionResponseDto.title( question.getTitle() );
        questionResponseDto.content( question.getContent() );
        questionResponseDto.expect( question.getExpect() );
        questionResponseDto.view( question.getView() );
        questionResponseDto.answer_count( question.getAnswer_count() );
        questionResponseDto.memberId( question.getMember().getMemberId() );
        questionResponseDto.createdAt( question.getCreatedAt() );

        return questionResponseDto.build();
    }
}
