import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import AskBtn from "../AskBtn";
import Comment from "../Answer";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 1300px;
  height: 2000px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-left: 20px;
`;

const TopSubDiv = styled.div`
  display: flex;
  margin-left: 23px;
`;

const DateDiv = styled.div`
  margin-right: 20px;
`;

const Span = styled.span`
  margin-right: 5px;
  color: gray;
`;

const Mainwrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
`;

const PTage = styled.div`
  margin-bottom: 20px;
`;

const QuestionDetail = () => {
  const { idx } = useParams();

  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  const selectedQuestion = questions.find((question) => question.id === idx);

  selectedQuestion.views += 1;
  localStorage.setItem("questions", JSON.stringify(questions));

  return (
    <MainContainer>
      <TopDiv>
        {selectedQuestion.title}
        <AskBtn>Ask Question</AskBtn>
      </TopDiv>
      <TopSubDiv>
        <DateDiv>
          <Span>Asked </Span>
          today
        </DateDiv>
        <DateDiv>
          <Span>Modified </Span>
          today
        </DateDiv>
        <DateDiv>
          <Span>Viewed </Span>
          {selectedQuestion.views} times
        </DateDiv>
      </TopSubDiv>

      <Mainwrapper>
        <PTage>{selectedQuestion.detail}</PTage>
        <PTage>{selectedQuestion.expect}</PTage>
      </Mainwrapper>
      <Comment/>
    </MainContainer>
  );
};

export default QuestionDetail;
