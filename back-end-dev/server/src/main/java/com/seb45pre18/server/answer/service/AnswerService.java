package com.seb45pre18.server.answer.service;


import com.seb45pre18.server.answer.entity.Answer;
import com.seb45pre18.server.answer.repository.AnswerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository){
        this.answerRepository = answerRepository;
    }
    // 회원이 질문글에 답변 생성
    public Answer createAnswer(Answer answer) {
        System.out.println(answer.getQuestion().getQuestionId());
        System.out.println(answer.getMemberEntity().getId());
        System.out.println(answer.getMemberEntity().getMemberId());

        return answerRepository.save(answer);
    }


    // 회원이 질문글에 작성한 답변 수정
    public Answer updateAnswer(Answer answer, Long answerId){
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        // Null 체크 후 AnswerId 값 설정
        Optional.ofNullable(answer.getAnswerId())
                .ifPresent(aId -> findAnswer.setAnswerId(aId));

        Optional.ofNullable(answer.getContent())
                .ifPresent(content -> findAnswer.setContent(content));

        Answer saveAnswer = answerRepository.save(findAnswer);

        return saveAnswer;
    }


    //잘문 하나만 읽어옴
    public Answer findAnswer(Long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);
        return findAnswer;
    }
    //질문 여러개 읽어옴
    public List<Answer> findAnswers() {
        List<Answer> answers = answerRepository.findAll();
        return answers;
    }

    //회원의 질문글에 작성한 답변삭제
    public void deleteAnswer(Long answerId) {
        Answer answer = findVerifiedAnswer(answerId);

        answerRepository.delete(answer);
    }


    public Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                        new ExceptionCode("Answer not found with ID: " + answerId));
        return findAnswer;
    }

}
