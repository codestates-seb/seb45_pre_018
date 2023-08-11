package com.seb45pre18.server.question.mapper;

import com.seb45pre18.server.question.dto.QuestionPostDto;
import com.seb45pre18.server.question.entity.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
}
