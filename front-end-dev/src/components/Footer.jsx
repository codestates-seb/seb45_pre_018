import { styled } from "styled-components";
const FooterDiv = styled.div`
  background-color: black;
  height: 340px;
  color: white;
  width: 100%;
`;

const StyledDiv = styled.div`
  font-weight: bold;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;
const FootersubDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 30%;
  margin-top: 30px;
  font-size: 2rem;
  padding: 20px;
`;
const Div = styled.div`
  display: flex;
  font-size: 1.2rem;
  width: 80%;
  justify-content: space-between;
  margin-top: px;
`;
const BackDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BackTitle = styled.div`
  color: #5db3ff;
  font-size: 1.5rem;
  margin-bottom: 5px;
`;
const FrontTitle = styled.div`
  color: #5dff88;
  font-size: 1.5rem;
  margin-bottom: 5px;
`;
const FrontDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = () => {
  return (
    <FooterDiv>
      <StyledDiv>
        <FootersubDiv>
          <div>Team Members</div>
          <Div>
            <BackDiv>
              <BackTitle>Back-end</BackTitle>
              <div>Hojun Lee</div>
              <div>Donghoon Lee</div>
              <div>Dayeon Woo</div>
            </BackDiv>
            <FrontDiv>
              <FrontTitle>Front-end</FrontTitle>
              <div>Taeyoung Park</div>
              <div>Jungwon Shin</div>
              <div>Seonghwan Choi</div>
            </FrontDiv>
          </Div>
        </FootersubDiv>
      </StyledDiv>
    </FooterDiv>
  );
};

export default Footer;
