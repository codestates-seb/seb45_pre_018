import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Side_bar";
import { styled } from "styled-components";
  
const Body = styled.div`


  
`;

function App() {
  return (
    <div style={{display:"flex",justifyContent:'center'}}>
      <div style={{maxWidth:'1300px',flex:'1 2 0'}}>
      <Header />
      <Body>
      <Sidebar />
        <Main />
        
      </Body>
      </div>
    </div>
  );
}

export default App;
