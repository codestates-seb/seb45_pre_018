import { styled } from "styled-components";
import AskBtn from "./AskBtn";

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
  margin: 0 0 50px 20px;
`;

const Mainwrapper = styled.div`
  display: flex;
  margin: 30px;
`;

const MainDivLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 30px;
`;
const SubDivLeft = styled.div`
  margin-bottom: 10px;
`;
const MainDivRight = styled.div`
  font-size: 2rem;
`;

const SubDivRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  max-width: 1100px;
`;

const TitleDiv = styled.div`
  width: 1100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: end;
  font-size: 1.2rem;
`;

const detailDate = (a) => {
  const milliSeconds = new Date() - a;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

const Main = () => {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  return (
    <MainContainer>
      <TopDiv>
        Top Questions<AskBtn>Ask Question</AskBtn>
      </TopDiv>
      {questions.map((question, index) => (
        <Mainwrapper key={index}>
          <MainDivLeft>
            <SubDivLeft>0 votes</SubDivLeft>
            <SubDivLeft>0 answers</SubDivLeft>
            <SubDivLeft>0 views</SubDivLeft>
          </MainDivLeft>
          <MainDivRight>
            <SubDivRight>
              <TitleDiv>{question.title}</TitleDiv>
              <DateDiv>
                asked {detailDate(new Date(question.createdAt))}
              </DateDiv>
            </SubDivRight>
          </MainDivRight>
        </Mainwrapper>
      ))}
    </MainContainer>
  );
};

export default Main;
