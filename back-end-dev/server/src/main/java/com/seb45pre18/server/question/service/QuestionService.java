package com.seb45pre18.server.question.service;

import com.seb45pre18.server.member.entity.MemberEntity;
import com.seb45pre18.server.member.service.MemberService;
import com.seb45pre18.server.question.entity.Question;
import com.seb45pre18.server.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // 질문 등록 메서드
    public Question createQuestion(Question question) {
        Question saveQuestion = questionRepository.save(question);

        return saveQuestion;
    }
    
    // 질문 업데이트 메서드
    public Question updateQuestion(Question question) {
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));
        Optional.ofNullable(question.getExpect())
                .ifPresent(expect -> findQuestion.setExpect(expect));

        Question saveQuestion = questionRepository.save(findQuestion);

        return saveQuestion;
    }

    // 질문을 하나만 읽어오는 메서드
    public Question findQuestion(long questionId) {
        return findVerifiedQuestion(questionId);
    }

    // Pagenation을 이용 여러개의 질문을 읽어오는 메서드
    public Page<Question> findQuestions(int page) {
        // 사이즈는 10으로 고정 변경 안함
        // id를 기준으로 내림차순 정렬
        return questionRepository.findAll(PageRequest.of(page, 10, Sort.by("questionId").descending()));
    }

    // 작성되있는 질문을 삭제하는 메서드
    public void deleteQuestion(int questionId) {
        Question question = findVerifiedQuestion(questionId);

        questionRepository.delete(question);
    }

    private Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);

        Question findQuestion = optionalQuestion.orElseThrow(() -> new RuntimeException());

        return findQuestion;
    }
}
