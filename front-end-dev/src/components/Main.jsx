import { styled } from 'styled-components'
import AskBtn from './AskBtn'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import globalAxios from '../data/data'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 0;
  width: 1300px;
  height: 2000px;
`

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin: 0 40px;
  height: 5%;
`

const Mainwrapper = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
`

const MainDivLeft = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  margin: 20px 20px 20px 40px;
`
const SubDivLeft = styled.div`
  margin-bottom: 10px;
`
const MainDivRight = styled.div`
  font-size: 1.5rem;
  margin: 20px;
`

const SubDivRight = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
`

const TitleDiv = styled.div`
  width: 1100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  margin-bottom: 10px;
`

const ContentsDiv = styled.p`
  font-size: 1.2rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`

const TagSideDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const Tags = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  border-radius: 10px;
  background-color: #e1ecf4;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 1rem;
  max-width: 50%;

  &:hover {
    background-color: #a8c5e0;
  }
`

const TagSideRight = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`

const UserName = styled.div`
  margin-right: 10px;
  font-size: 1rem;
`

const DateDiv = styled.div`
  display: flex;
  justify-content: end;
  font-size: 1.2rem;
`

const StyledLink = styled(Link)`
  color: #0074cc;
  text-decoration: none;

  &:hover {
    color: #0a95ff;
  }
`

const detailDate = (a) => {
  const milliSeconds = new Date() - a
  const seconds = milliSeconds / 1000
  if (seconds < 60) return `방금 전`
  const minutes = seconds / 60
  if (minutes < 60) return `${Math.floor(minutes)}분 전`
  const hours = minutes / 60
  if (hours < 24) return `${Math.floor(hours)}시간 전`
  const days = hours / 24
  if (days < 7) return `${Math.floor(days)}일 전`
  const weeks = days / 7
  if (weeks < 5) return `${Math.floor(weeks)}주 전`
  const months = days / 30
  if (months < 12) return `${Math.floor(months)}개월 전`
  const years = days / 365
  return `${Math.floor(years)}년 전`
}

const Main = () => {
  const [questions, setQuestions] = useState([])

  const getQuestion = async () => {
    try {
      const response = await globalAxios.get('/questions?page=1')
      const getData = response.data
      setQuestions(getData.data)
      console.log('response >>', getData)
    } catch (err) {
      console.log('Error >>', err)
    }
  }

  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <MainContainer>
      <TopDiv>
        All Questions<AskBtn>Ask Question</AskBtn>
      </TopDiv>
      {questions.slice().map((question, index) => (
        <Mainwrapper key={index}>
          <MainDivLeft>
            <SubDivLeft>0 votes</SubDivLeft>
            <SubDivLeft>{question.answer_count} answers</SubDivLeft>
            <SubDivLeft>{question.view} views</SubDivLeft>
          </MainDivLeft>
          <MainDivRight>
            <SubDivRight>
              <TitleDiv>
                <StyledLink to={`questions/${question.questionId}`}>{question.title}</StyledLink>
              </TitleDiv>
              <ContentsDiv> {question.content}</ContentsDiv>
              <TagSideDiv>
                {question.tags ? <Tags>{question.tags}</Tags> : <div></div>}
                <TagSideRight>
                  <UserName>{question.id}</UserName>
                  <DateDiv>asked {detailDate(new Date(question.createdAt))}</DateDiv>
                </TagSideRight>
              </TagSideDiv>
            </SubDivRight>
          </MainDivRight>
        </Mainwrapper>
      ))}
    </MainContainer>
  )
}

export default Main
