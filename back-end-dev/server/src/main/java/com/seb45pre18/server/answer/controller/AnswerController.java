package com.seb45pre18.server.answer.controller;

import com.seb45pre18.server.answer.dto.AnswerPatchDto;
import com.seb45pre18.server.answer.dto.AnswerPostDto;
import com.seb45pre18.server.answer.dto.AnswerResponseDto;
import com.seb45pre18.server.answer.entity.Answer;
import com.seb45pre18.server.answer.mapper.AnswerMapper;
import com.seb45pre18.server.answer.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
@CrossOrigin
public class AnswerController {
//    private final static String ANSWER_DEFAULT_URL = "/answers";
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    //질문글에 답변을 쓸때 답변 생성
    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto requestBody){

        Answer answer = mapper.answerPostToAnswer(requestBody);

        Answer savedAnswer = answerService.createAnswer(answer);
        savedAnswer.setQuestionId(savedAnswer.getQuestion().getQuestionId());
        savedAnswer.setId(savedAnswer.getMemberEntity().getId());
        savedAnswer.setMemberId(savedAnswer.getMemberId());

        AnswerResponseDto responseDto = mapper.answerToAnswerResponse(savedAnswer);

       // URI location = UriCreator.createUri(ANSWER_DEFAULT_URL, answer.getAnswerId());

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

    }

    //질문글에 작성한 답변 내용 수정
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") Long answerId,
                                      @RequestBody AnswerPatchDto requestBody) {
        requestBody.setAnswerId(answerId);

        Answer response = answerService.updateAnswer(mapper.answerPatchToAnswer(requestBody),answerId);

        response.setQuestionId(response.getQuestion().getQuestionId());
        response.setId(response.getMemberEntity().getId());
        response.setMemberId(response.getMemberId());

        return new ResponseEntity<>(mapper.answerToAnswerResponse(response), HttpStatus.OK);
    }

    // 답변 하나 조회
    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") Long answerId) {
        Answer response = answerService.findAnswer(answerId);
        response.setQuestionId(response.getQuestion().getQuestionId());
        response.setId(response.getMemberEntity().getId());

        AnswerResponseDto responseDto = mapper.answerToAnswerResponse(response);
        responseDto.setMemberId(response.getMemberEntity().getMemberId()); // memberId 설정

        return new ResponseEntity<>(mapper.answerToAnswerResponse(response), HttpStatus.OK);
    }
//
    // 여러 답변 조회
    @GetMapping
    public ResponseEntity getAnswers() {
        List<Answer> answers = answerService.findAnswers();

        List<AnswerResponseDto> response = answers.stream()
                .map(answer -> {
                    AnswerResponseDto dto = mapper.answerToAnswerResponse(answer);
                    dto.setQuestionId(answer.getQuestion().getQuestionId()); // QuestionId 설정
                    dto.setId(answer.getMemberEntity().getId()); // memberId 설정
                    dto.setMemberId(answer.getMemberEntity().getMemberId());
                    return dto;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 답변 삭제
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") Long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
