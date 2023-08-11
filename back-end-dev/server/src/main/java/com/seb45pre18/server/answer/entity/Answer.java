package com.seb45pre18.server.answer.entity;


import com.seb45pre18.server.question.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.lang.reflect.Member;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Answer extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column
    private String nickname;

    @Column(nullable = false)
    private String content;

    // 회원과 답변 1:N관계 매핑
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    // 질문과 답변 1:N관계 매핑
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;




}
