import globalAxios from '../../data/data'
import { useEffect, useState } from 'react'

const MyPage = () => {
  const [loggedInUsers, setLoggedInUsers] = useState([])
  const [newPassword, setNewPassword] = useState('')
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      // 로그인된 사용자 정보 가져오기
      globalAxios
        .get('/member/login')
        .then((response) => {
          const users = response.data
          const loggedInUsers = users.filter((user) => user.isLogin === true)
          setLoggedInUsers(loggedInUsers)
        })
        .catch((error) => {
          console.log('에러', error)
        })
    }
  }, [])

  const handlePasswordChange = async () => {
    try {
      const response = await globalAxios.post('/member/update', {
        newPassword: newPassword,
      })

      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.')
        setNewPassword('')
      } else {
        alert('비밀번호 변경에 실패했습니다.')
      }
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error)
    }
  }

  return (
    <div>
      {loggedInUsers.map((user) => (
        <div key={user.info}>
          <p>{user.member_id}</p>
          <p>{user.name}</p>
        </div>
      ))}

      {/* 비밀번호 수정 입력 필드 및 버튼 */}
      <input type="password" placeholder="변경할 비밀번호를 입력하세요" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handlePasswordChange}>비밀번호 변경</button>
    </div>
  )
}

export default MyPage
