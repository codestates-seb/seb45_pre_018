package com.seb45pre18.server.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Question {
    @Id
    private Integer questionId;

    private String title;

    private String content;

    private Integer view;

    private LocalDateTime createdAt = LocalDateTime.now();
}
