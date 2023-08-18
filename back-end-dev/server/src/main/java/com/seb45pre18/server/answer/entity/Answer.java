package com.seb45pre18.server.answer.entity;


import com.seb45pre18.server.member.entity.MemberEntity;
import com.seb45pre18.server.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Answer extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false)
    private String content;

    private Long Id;
    private Long questionId;

    // 회원과 답변 1:N관계 매핑
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private MemberEntity memberEntity;


    // 질문과 답변 1:N관계 매핑
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;



}
