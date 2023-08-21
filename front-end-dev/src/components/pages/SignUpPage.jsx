import styled from 'styled-components'
import { useState } from 'react'


const SignContainer = styled.div`
display:flex;
flex-direction:column;
text-align:center;
width:100wh;
width:500px;
height:600px;

border:1px solid#FFC043;
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

const signComplete = () => {
    const newUserData = [{
      id: '',
      full_name: newName,
      email: newId,
      gender: 'male',
      date_of_birth: '2022.03.03',
      country_code: '',
      created_at: '',
      password: newPw,
    }];
    
    const usersData = JSON.parse(localStorage.getItem('user')) || [];

    const upDateUserData = [...usersData,newUserData]
    if(newId.length < 5 ){
        alert('5이상')
    }else if(newId.length > 8 ){
        alert('8미만')
    }else if(newPw.length < 8){
        alert('8이상')
    }else if(newPw.length >12){
        alert('12미만')
    }else{ localStorage.setItem('user', JSON.stringify(upDateUserData));

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
                <SignInputStyle type="text" value ={newPw} onChange={(e)=>{setNewPw(e.target.value) 
                console.log(newPw)}}/>
                
                    <p>비밀번호 확인</p>
                <SignInputStyle type="text"/>
               
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