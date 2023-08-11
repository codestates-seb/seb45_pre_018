import { styled } from "styled-components";
import AskBtn from "./AskBtn";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  max-width: 1500px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-bottom: 50px;
`;

const Mainwrapper = styled.div`
  display: flex;
  min-width: 1300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 2000px;
`;
// const MainDiv = styled.div``;

const MainDivLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;
const MainDivRight = styled.div`
  font-size: 2rem;
`;
const Main = () => {
  return (
    <MainContainer>
      <TopDiv>
        Top Questions<AskBtn>Ask Question</AskBtn>
      </TopDiv>
      <Mainwrapper>
        <MainDivLeft>
          <div>0 votes</div>
          <div>0 answers</div>
          <div>0 views</div>
        </MainDivLeft>
        <MainDivRight>
          Dynamic mutation in vue3 with vuex and typescript
        </MainDivRight>
      </Mainwrapper>
    </MainContainer>
  );
};

export default Main;
