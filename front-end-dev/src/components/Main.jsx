import { styled } from "styled-components";
import AskBtn from "./AskBtn";
import PropTypes from "prop-types";
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

const MainDiv = styled.div`
  max-width: 1300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Main = () => {
  return (
    <MainContainer>
      <TopDiv>
        Top Questions<AskBtn>Ask Question</AskBtn>
      </TopDiv>
      <MainDiv>
        MainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMain
        MainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMain
        MainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMain
      </MainDiv>
    </MainContainer>
  );
};

Main.propTypes = {
  setIsClicked: PropTypes.func.isRequired,
};

export default Main;
