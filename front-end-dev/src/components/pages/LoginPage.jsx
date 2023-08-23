import styled from 'styled-components'
import { useEffect, useState } from 'react'
import logo from '/logo-stackoverflow.png'
import SignUpBtn from '../SignUpBtn.jsx'
import globalAxios from '../../data/data'
const LoginContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0);
  height: 527px;
  width: 100vw;
  justify-content: center;
  align-items: center;
`
const LoginForm = styled.div`
  display: flex;
  padding: 30px;
  height: 360px;

  flex-direction: column;
  box-shadow: 1px 2px 6px 1px rgba(156, 156, 85, 0.5);
  border-radius: 20px 20px;
  justify-content: space-around;
`

const InputStyle = styled.input`
  width: 300px;
  height: 35px;
  margin-bottom: 5px;
  line-height: 30px;
  outline: none;
  font-size: 15px;
  border: 1px solid#0a95ff;
`
const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const LoginBTN = styled.div`
  margin-top: 20px;
  width: 120px;
  height: 30px;
  text-align: center;
  border-radius: 30px 30px;
  background: #0a95ff;
  line-height: 30px;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s;
  color: white;
  &:hover {
    color: #0a95ff;
    background: white;
    border: 1px solid#0a95ff;
  }
`

const Logo = styled.img`
  width: 290px;
  height: 62px;
  margin-bottom: 20px;
`

const userData = globalAxios
  .get('/member/login')
  .then((response) => {
    console.log('데이터받음', response)
  })
  .catch((error) => {
    console.log('에러', error)
  })

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const userCheck = async () => {
    try {
      const response = await globalAxios.get('/member/login')
      const users = response.data

      let result = null
      for (let user of users) {
        if (user.memberId === id && user.password === pw) {
          result = 'good'
          break
        } else if (user.memberId !== id) {
          result = 'idfail'
          break
        } else if (user.password !== pw) {
          result = 'pwfail'
        }
      }

      if (result === 'good') {
        try {
          const response = await globalAxios.post('/member/login', {
            memberId: id,
            password: pw,
          })
          if (response.status === 200) {
            const jwtToken = response.data.token
            // 토큰 저장
            localStorage.setItem('jwtToken', jwtToken)

            alert('로그인 성공')
            setIsLogin(true)
            // 로그인 성공 시 메인 페이지로 리디렉션
            window.location.href = 'http://localhost:3006/'
          } else {
            console.error('로그인 실패')
          }
        } catch (error) {
          console.error('로그인 중 오류 발생:', error)
        }
        if (result === 'pwfail') {
          alert('비밀번호가 일치하지 않습니다')
        }
        if (result === 'idfail') {
          alert('등록되지 않은 계정입니다')
        }
      } else {
        alert('등록된 사용자가 없습니다')
        console.log(isLogin)
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error)
    }
  }

  return (
    <LoginContainer>
      <LoginForm>
        <Logo src={logo}></Logo>
        <div className="TypingArea">
          <p>ID</p>
          <InputStyle
            value={id}
            onChange={(e) => {
              setId(e.target.value)
              console.log(id)
            }}
            placeholder="아이디를 입력하세요"
          />

          <p>Password</p>
          <InputStyle
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value)
            }}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <ButtonArea>
          <LoginBTN onClick={userCheck}>Login</LoginBTN>
          <SignUpBtn />
        </ButtonArea>
      </LoginForm>
    </LoginContainer>
  )
}

export default LoginPage
