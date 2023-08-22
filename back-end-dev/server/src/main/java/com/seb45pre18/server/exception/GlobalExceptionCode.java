package com.seb45pre18.server.exception;

import lombok.Getter;

public enum GlobalExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    QUESTION_NOT_FOUND(404, "Question not found");

    @Getter
    private int status;

    @Getter
    private String message;

    GlobalExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
