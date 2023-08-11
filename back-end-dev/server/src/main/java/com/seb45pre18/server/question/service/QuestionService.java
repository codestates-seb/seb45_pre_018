package com.seb45pre18.server.question.service;

import com.seb45pre18.server.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class QuestionService {

    // 질문 등록 메서드
    public Question createQuestion(Question question) {
        return null;
    }
    
    // 질문 업데이트 메서드
    public Question updateQuestion(Question question) {
        return null;
    }

    // 질문을 하나만 읽어오는 메서드
    public Question findQuestion(int questionId) {
        return null;
    }

    // Pagenation을 이용 여러개의 질문을 읽어오는 메서드
    public Page<Question> findQuestions(int page, int size) {
        return null;
    }

    // 작성되있는 질문을 삭제하는 메서드
    public void deleteQuestion(int questionId) {
        
    }
}
