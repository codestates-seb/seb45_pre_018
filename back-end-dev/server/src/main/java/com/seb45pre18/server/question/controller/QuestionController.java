package com.seb45pre18.server.question.controller;

import com.seb45pre18.server.question.dto.MultiResponseDto;
import com.seb45pre18.server.question.dto.QuestionPatchDto;
import com.seb45pre18.server.question.dto.QuestionPostDto;
import com.seb45pre18.server.question.entity.Question;
import com.seb45pre18.server.question.mapper.QuestionMapper;
import com.seb45pre18.server.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    // 질문 작성
    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionDto) {
        Question question = mapper.questionPostDtoToQuestion(questionDto);
        question.setView(0);
        question.setAnswer_count(0);
        
        // TODO : QuestionService에서 질문 생성 메서드 작성 후 적용
        Question createQuestion = questionService.createQuestion(question);

        // 값이 제대로 들어오는지 확인 완료.

        // TODO : URI 생성
        URI location = UriComponentsBuilder.newInstance()
                .path("/questions" + "/{createQuestion.getQuestionId()}")
                .buildAndExpand(createQuestion.getQuestionId()).toUri();

        // TODO : ResponseEntity 생성 후 반환
        return ResponseEntity.created(location).build();
    }

    // 질문 수정
    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive int questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {
        // TODO : QuestionPatchDto 생성
        // TODO : 가져온 id를 PatchDto에 set
        questionPatchDto.setQuestionId(questionId);

        // TODO : QuestionService에서 질문 업데이트 메서드 작성 후 적용
        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto));

        // TODO : 새로 ResponseEntity 생성 후 반환
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    // 질문 상세 페이지 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive int questionId) {
        // TODO : QuestionService에서 질문 하나 받아올 메서드 작성 후 적용
        Question question = questionService.findQuestion(questionId);

        // TODO : ResponseEntity 넘겨주는거 추가 필요
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    // 메인 페이지 질문 리스트 조회
    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam int page) {
        // TODO : QuestionService에서 질문들을 페이지 별로 받아올 메서드 작성 후 적용
        // TODO : Pagenation 적용
        Page<Question> pageQuestions = questionService.findQuestions(page - 1);
        List<Question> questions = pageQuestions.getContent();

        // TODO : ResponseEntity 넘겨주는거 추가 필요
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponseDtos(questions),
                pageQuestions), HttpStatus.OK);
    }

    // 질문 삭제
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteMember(@PathVariable("question-id") @Positive int questionId) {
        // TODO : QuestionService에서 질문 삭제 메서드 작성 후 적용
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
