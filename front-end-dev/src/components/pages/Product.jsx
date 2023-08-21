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
const Product = () => {
  return <MainContainer>Stack Overflow Clone Coding</MainContainer>;
};

export default Product;
