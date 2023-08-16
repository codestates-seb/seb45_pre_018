package com.seb45pre18.server.question.entity;

import com.seb45pre18.server.member.entity.MemberEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    private Integer view;

    private Integer answer_count;

    private LocalDateTime createdAt = LocalDateTime.now();

//    @ManyToOne
//    @JoinColumn(name = "Member_Id")
//    private MemberEntity member;
//
//    public void setMember(MemberEntity member) {
//        this.member = member;
//    }
}
