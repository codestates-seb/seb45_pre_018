import { styled } from "styled-components";
import AskBtn from "./AskBtn";
import PropTypes from "prop-types";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 20px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-bottom: 50px;
`;

const MainDiv = styled.div`
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Main = ({ setIsClicked }) => {
  return (
    <MainContainer>
      <TopDiv>
        Top Questions<AskBtn setIsClicked={setIsClicked}>Ask Question</AskBtn>
      </TopDiv>
      <MainDiv>
        MainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMain
      </MainDiv>
    </MainContainer>
  );
};

Main.propTypes = {
  setIsClicked: PropTypes.func.isRequired,
};

export default Main;
