import { styled } from "styled-components";
import AskBtn from "./AskBtn";
import { Link } from "react-router-dom";

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
  font-size: 1.5rem;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentsDiv = styled.p`
  font-size: 1.2rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: end;
  font-size: 1.2rem;
`;

const StyledLink = styled(Link)`
  color: #0074cc;
  text-decoration: none;

  &:hover {
    color: #0a95ff;
  }
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
        All Questions<AskBtn>Ask Question</AskBtn>
      </TopDiv>
      {questions
        .slice()
        .reverse()
        .map((question, index) => (
          <Mainwrapper key={index}>
            <MainDivLeft>
              <SubDivLeft>0 votes</SubDivLeft>
              <SubDivLeft>{question.answers} answers</SubDivLeft>
              <SubDivLeft>{question.views} views</SubDivLeft>
            </MainDivLeft>
            <MainDivRight>
              <SubDivRight>
                <TitleDiv>
                  <StyledLink to={question.id}>{question.title} </StyledLink>
                </TitleDiv>
                <ContentsDiv> {question.detail}</ContentsDiv>
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
