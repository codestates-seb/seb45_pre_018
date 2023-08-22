package com.seb45pre18.server.question.entity;

import com.seb45pre18.server.answer.entity.Answer;
import com.seb45pre18.server.member.entity.MemberEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    private String title;

    private String content;

    private String expect;

    private String tags;

    private Integer view;

    private Integer answer_count;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private MemberEntity member;

    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
    private List<Answer> answers = new ArrayList<>();

    public void setMember(MemberEntity member) {
        this.member = member;
    }

    public void setAnswer(Answer answer) {
        answers.add(answer);
        if(answer.getQuestion() != this) {
            answer.setQuestion(this);
        }
    }
}
