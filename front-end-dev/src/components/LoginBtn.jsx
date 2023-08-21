
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const Buttons = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  width: 80px;
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

const LoginBtn = () => {
    const navigate = useNavigate();
    const navigateHandler = () => {
      navigate("/login");
    }

      return (
      
      <>
    <Buttons onClick ={navigateHandler}color="#39739d" backgroundColor="#E1ECF4" hoverColor="#A8C5E0">
      Log in
    </Buttons>
   
    
  
    
    </>)
    };
  
export default LoginBtn
  