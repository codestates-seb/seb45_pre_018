import styled from 'styled-components'
import { useState } from 'react'
import globalAxios from '../../data/data'

const SignContainer = styled.div`
display:flex;
flex-direction:column;
text-align:center;
width:100wh;
width:500px;
height:600px;



padding-top:50px;
border-radius:20px 20px;

`
const SignTypingArea = styled.div`
margin-top:40px;


`
const SignBtnStyle= styled.div`
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
const SignButtonArea = styled.div`

width:100%;
display:flex;
justify-content:space-around;
`

const SignInputStyle = styled.input`

width:300px;
height:35px;
margin-bottom:5px;
line-height:30px;
outline:none;
font-size:15px;
border:1px solid#0a95ff;
`
const SignBtnOffStyle = styled.div`
margin-top:20px;
width:120px;
height:30px;
text-align:center;
border-radius: 30px 30px;
background:#f3f3f3;
color:#c3c3c3;
line-height:30px;
box-shadow:0px 0px 2px 1px rgba(0,0,0,0.3);
transition: all .3s;
`



const SignUpPage  = ()=>{
const [newName ,setNewName] = useState('');
const [newId , setNewId] = useState('');
const [newPw,setNewPw] = useState('');
const [pwCheck, setPwCheck] = useState('')

const generateJwtToken = async () => {
    try {
      const response = await globalAxios.post("/member/save", {
        name:newName,
        memberId: newId,
        password: newPw,
      });

      if (response.status === 200) {
        const jwtToken = response.data.token;
        // 이후 토큰을 사용하거나 저장할 수 있습니다.
        localStorage.setItem('jwtToken', jwtToken);
        console.log("JWT Token:", jwtToken);
      } else {
        console.error("JWT Token 생성 실패");
      }
    } catch (error) {
      console.error("JWT Token 생성 중 오류 발생:", error);
    }
  };


const signComplete = async() => {
    
    
 

  
    // if(isDuplicate){
    //     alert('중복된 아이디 입니다')
    // }
    if(newId.length < 5 ){
        alert('아이디는 5~8글자 사이로 작성해주세요 ')
    }else if(newId.length > 8 ){
        alert('아이디는 5~8글자 사이로 작성해주세요')
    }else if(newPw.length < 8){
        alert('비밀번호는 8~12글자 사이로 작성해주세요')
    }else if(newPw.length >12){
        alert('비밀번호는 8~12글자 사이로 작성해주세요')
    }else if(pwCheck!==newPw || newPw !==pwCheck){
        alert('비밀번호를 확인해주세요')
    }else{ 
    
     await generateJwtToken();
    alert('회원가입이 완료되었습니다 로그인을 진행해 주세요')

    window.location.href = "http://localhost:3006/login";
        
    console.log('완료');

    // 로컬 스토리지에 userData 저장
    }

  };
   
    return(
        <SignContainer>
            <SignTypingArea>
               
                    <p>이름</p>
                <SignInputStyle type="text" value ={newName} onChange={(e)=>{setNewName(e.target.value) 
                console.log(newName)}}/>
               
                    <p>아이디</p>
                <SignInputStyle type="text" value ={newId} onChange={(e)=>{setNewId(e.target.value) 
                console.log(newId)}}/>
                
                    <p>비밀번호</p>
                <SignInputStyle type="password" value ={newPw} onChange={(e)=>{setNewPw(e.target.value) 
                }}/>
                
                    <p>비밀번호 확인</p>
                <SignInputStyle type="password" value={pwCheck} onChange={(e)=>{setPwCheck(e.target.value)}}/>
               
            </SignTypingArea>
            <SignButtonArea>
                {
                    newName&&newId&&newPw !== '' ?<SignBtnStyle onClick={signComplete}>가입하기</SignBtnStyle> :
                    <SignBtnOffStyle>가입하기</SignBtnOffStyle>
                }
               
            </SignButtonArea>


        </SignContainer>

    )


}
export default SignUpPage