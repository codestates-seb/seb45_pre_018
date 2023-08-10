import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Side from "./components/Side_bar";
import { styled } from "styled-components";

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;    
`;

function App() {
  return (
    <>
      <Header />
      <Body>
        <Main />
        <Side />
      </Body>
    </>
  );
}

export default App;
