import styled from 'styled-components'
import  {useState} from 'react';
import logo from "/logo-stackoverflow.png";
import SignUpBtn from "../SignUpBtn.jsx"



const LoginContainer = styled.div`
display:flex;
background:rgba(255,255,255,0);
height:527px;
width:100vw;
justify-content:center;
align-items:center;

`
const LoginForm = styled.div`


display:flex;
padding : 30px;
height:360px;


flex-direction:column;
box-shadow:1px 2px 6px 1px rgba(156,156,85,0.5);
border-radius:20px 20px;
justify-content:space-around;


`

const InputStyle = styled.input`

width:300px;
height:35px;
margin-bottom:5px;
line-height:30px;
outline:none;
font-size:15px;
border:1px solid#0a95ff;
`
const ButtonArea = styled.div`

display:flex;
flex-direction:row;
justify-content: space-around;

`
const LoginBTN = styled.div`
    margin-top:20px;
    width:120px;
    height:30px;
    text-align:center;
    border-radius: 30px 30px;
    background:#0a95ff;
    line-height:30px;
    box-shadow:0px 0px 2px 1px rgba(0,0,0,0.3);
    cursor:pointer;
    transition: all .3s;
    color:white;
    &:hover{
        color:#0a95ff;
        background:white;
        border:1px solid#0a95ff;
    }
`


const Logo = styled.img`

width:290px;
height:62px;
margin-bottom:20px;


`




const LoginPage =()=>{
    const [isLogin,setIsLogin] = useState(false)
    const [id,setId] = useState('')
    const [pw,setPw] = useState('')
    
   
    const userCheck = () => {
      const storedValue = localStorage.getItem('user');
      if (storedValue) {
        const parsedStoredValue = JSON.parse(storedValue);
    
        let result = null;
        for (let el of parsedStoredValue) {
          if (el.email === id && el.password === pw) {
            result = 'good';
            el.isLogin = true;
            localStorage.setItem('user')
            break;
          } else if (el.email === id) {
            result = 'pwfail';
            break;
          }
        }
    
        if (result === 'good') {
          alert('로그인성공');
          setIsLogin(true);
        
       
          // 로그인 성공 시 메인 페이지로 리디렉션
          window.location.href = 'http://localhost:3007/';
        } else if (result === 'pwfail') {
          alert('비밀번호가 일치하지 않습니다');
        } else {
          alert('등록되지 않은 계정입니다');
        }
      } else {
        alert('등록된 사용자가 없습니다');
      }
    };
  
    return (
        
        <LoginContainer>
            <LoginForm>
            <Logo src={logo}></Logo>
            <div className="TypingArea">
                   
              <p>ID</p> 
              <InputStyle               
               value = {id}
               onChange ={(e)=>{setId(e.target.value)
               console.log(id)}}
               placeholder="아이디를 입력하세요"/>
                
                 <p>Password</p>
               <InputStyle 
               type = 'password'
               value = {pw} 
               onChange={(e)=>{setPw(e.target.value) 
                console.log(pw)}}
               placeholder="비밀번호를 입력하세요"/>
             
            </div>
            <ButtonArea>

              <LoginBTN onClick={userCheck}>Login</LoginBTN>
              <SignUpBtn/>

            </ButtonArea>
             
               
            </LoginForm>
            </LoginContainer>
        
    )


}

export default LoginPage