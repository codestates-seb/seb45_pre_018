
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const Buttons = styled.div`
margin-top:20px;    
width:120px;
height:30px;
text-align:center;
border-radius: 30px 30px;
background:#0a95ff;
line-height:30px;
box-shadow:0px 0px 2px 1px rgba(0,0,0,0.3);
cursor:pointer;
color:white;
transition: all .3s;
    &:hover{
        color:#0a95ff;
        background:white;
        border:1px solid#0a95ff;
    }
`;

const SignUpBtn = () => {
    const navigate = useNavigate();
    const navigateHandler = () => {
      navigate("/signup");
    }
      return (
      
      <>
      <Buttons onClick ={navigateHandler}color="#39739d" backgroundColor="#E1ECF4" hoverColor="#A8C5E0">
      Sign Up
    </Buttons>
   
    
  
    
    </>)
    };
  
export default SignUpBtn
  