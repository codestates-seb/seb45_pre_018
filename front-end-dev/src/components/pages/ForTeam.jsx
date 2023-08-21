import { styled } from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 1300px;
  height: 2000px;
  margin-top: 50px;
  font-size: 3rem;
`;

const ForTeam = () => {
  return <MainContainer>우리팀은 최고다</MainContainer>;
};

export default ForTeam;
