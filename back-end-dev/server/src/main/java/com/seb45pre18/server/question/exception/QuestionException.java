package com.seb45pre18.server.question.exception;

import com.seb45pre18.server.exception.GlobalExceptionCode;
import lombok.Getter;

public class QuestionException extends RuntimeException{
    @Getter
    private GlobalExceptionCode exceptionCode;

    public QuestionException(GlobalExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
