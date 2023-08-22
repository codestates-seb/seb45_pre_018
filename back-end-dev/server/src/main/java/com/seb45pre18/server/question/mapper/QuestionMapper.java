package com.seb45pre18.server.question.mapper;

import com.seb45pre18.server.answer.dto.AnswerResponseDto;
import com.seb45pre18.server.answer.entity.Answer;
import com.seb45pre18.server.member.entity.MemberEntity;
import com.seb45pre18.server.member.service.MemberService;
import com.seb45pre18.server.question.dto.QuestionPatchDto;
import com.seb45pre18.server.question.dto.QuestionPostDto;
import com.seb45pre18.server.question.dto.QuestionResponseDto;
import com.seb45pre18.server.question.entity.Question;
import org.mapstruct.Mapper;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
//    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
//    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
//    QuestionResponseDto questionToQuestionResponseDto(Question question);
    List<QuestionResponseDto> questionsToQuestionResponseDtos(List<Question> questions);

    default Question questionPostDtoToQuestion(QuestionPostDto questionPostDto) {
        Question question = new Question();
        MemberEntity member = new MemberEntity();
        member.setId(questionPostDto.getMemberId());

        question.setTitle( questionPostDto.getTitle() );
        question.setContent( questionPostDto.getContent() );
        question.setExpect( questionPostDto.getExpect() );
        question.setTags( questionPostDto.getTags() );
        question.setAnswer_count( question.getAnswer_count() );
        question.setCreatedAt( LocalDateTime.now() );
        question.setModifiedAt( LocalDateTime.now() );
        question.setMember(member);

        return question;
    }

    default Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto) {
        if ( questionPatchDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionId( questionPatchDto.getQuestionId() );
        question.setTitle( questionPatchDto.getTitle() );
        question.setContent( questionPatchDto.getContent() );
        question.setExpect( questionPatchDto.getExpect() );
        question.setTags( questionPatchDto.getTags() );
        question.setModifiedAt( LocalDateTime.now() );

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
        questionResponseDto.tags( question.getTags() );
        questionResponseDto.view( question.getView() );
        questionResponseDto.answer_count( question.getAnswer_count() );
        questionResponseDto.memberId( question.getMember().getMemberId() );
        questionResponseDto.createdAt( question.getCreatedAt() );
        questionResponseDto.modifiedAt( question.getModifiedAt() );
        questionResponseDto.answers( answersToAnswerResponseDtos(question.getAnswers()) );

        return questionResponseDto.build();
    }

    default List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers) {
        return answers
                .stream()
                .map(answer -> AnswerResponseDto
                        .builder()
                        .answerId(answer.getAnswerId())
                        .Id(answer.getMemberEntity().getId())
                        .questionId(answer.getQuestion().getQuestionId())
                        .memberId(answer.getMemberEntity().getMemberId())
                        .content(answer.getContent())
                        .createdAt(answer.getCreatedAt())
                        .modifiedAt(answer.getModifiedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
