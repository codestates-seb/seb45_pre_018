import { useParams, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import AskBtn from '../AskBtn'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Comment from '../Answer'
import globalAxios from '../../data/data'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 0;
  width: 1300px;
  min-height: 2000px;
`

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin: 0 40px;
  height: 5%;
`

const TopSubDiv = styled.div`
  display: flex;
  margin-left: 40px;
`

const DateDiv = styled.div`
  margin-right: 20px;
`

const Span = styled.span`
  margin-right: 5px;
  color: gray;
`

const Mainwrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 20px 40px;
`

const PTage = styled.div`
  margin-bottom: 20px;
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

const Container = styled.div`
  display: flex;
`
const LeftContainer = styled.div`
  display: flex;
  width: 80%;
`
const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #e1ecf4;
  padding: 10px;
  border-radius: 10px;
`
const Btns = styled.button`
  background-color: white;
  color: gray;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    color: black;
  }
`

const WriteTitle = styled.div`
  margin-bottom: 16px;
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
`

const InputTag = styled.input`
  width: 70%;
  height: 35px;
  border-radius: 10px;
  margin-top: 10px;
  border: 2px solid whitesmoke;
  padding: 10px;
`

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid gainsboro;
  margin-top: 20px;
  width: 70%;
  min-height: 200px;
  resize: vertical;
`

const Bubble = styled.div`
  position: relative;
  width: 50%;
  padding: 20px;
  margin: 10px 0;
  background: #ffffff;
  border-radius: 10px;
  border: 3px solid #bebebe;

  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 15px 15px;
    border-color: #bebebe transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -15px;
    left: 10px;
  }
`

const ShareBtns = styled.button`
  background-color: white;
  color: #5b71ff;
  border: none;
  cursor: pointer;
  margin: 10px;
  font-size: 1rem;

  &:hover {
    color: #2a47ff;
  }
`

const WarningDiv = styled.div`
  font-size: 1rem;
  color: red;
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

const QuestionDetail = () => {
  const { idx } = useParams()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedQuestion, setselectedQuestion] = useState()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedExpect, setEditedExpect] = useState('')
  const [editedDetail, setEditedDetail] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewCount, setViewCount] = useState(1)

  const getQuestion = async () => {
    try {
      const response = await globalAxios.get('questions?page=1')
      const getData = response.data
      setQuestions(getData.data)
      setIsLoading(false)
      console.log('response >>', getData)
    } catch (err) {
      console.log('Error >>', err)
    }
  }

  // const updatedHandler = async () => {
  //   try {
  //     const updatedQuestions = {
  //       title: editedTitle,
  //       expect: editedExpect,
  //       content: editedDetail,
  //       view: viewCount,
  //     }

  //     await globalAxios.patch(`questions/${idx}`, updatedQuestions)
  //   } catch (error) {
  //     console.log('Error updating question:', error)
  //   }
  // }

  useEffect(() => {
    getQuestion()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const selectedQuestion = questions.find((question) => question.questionId == idx)
      setselectedQuestion(selectedQuestion)
    }
  }, [isLoading, idx, questions])

  // const selectedQuestion = questions.find((question) => question.questionId == idx)

  useEffect(() => {
    if (selectedQuestion) {
      setEditedTitle(selectedQuestion.title)
      setEditedExpect(selectedQuestion.expect)
      setEditedDetail(selectedQuestion.content)
      setViewCount(selectedQuestion.view)
    }
  }, [selectedQuestion])

  useEffect(() => {
    if (selectedQuestion) {
      const updatedViewCount = viewCount + 1
      setViewCount(updatedViewCount)
      selectedQuestion.view = updatedViewCount
    }
  }, [selectedQuestion])

  const handleDeleteClick = async () => {
    try {
      const response = await globalAxios.get(`questions/${idx}`)
      const questionData = response.data
      const answers = questionData.answers || []

      // 답변들을 삭제합니다.
      for (const answer of answers) {
        await globalAxios.delete(`answers/${answer.answerId}`)
      }

      await globalAxios.delete(`questions/${idx}`)

      navigate('/')
    } catch (error) {
      console.log('Error deleting question:', error)
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    setIsEditing(false)

    try {
      const updatedQuestions = {
        title: editedTitle,
        expect: editedExpect,
        content: editedDetail,
        modifiedAt: new Date().toISOString(),
      }

      await globalAxios.patch(`questions/${idx}`, updatedQuestions)
    } catch (error) {
      console.log('Error updating question:', error)
    }
  }

  const handleCancelClick = () => {
    setEditedTitle(selectedQuestion.title)
    setEditedExpect(selectedQuestion.expect)
    setEditedDetail(selectedQuestion.content)
    setIsEditing(false)
  }

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value)
  }

  const handleExpectChange = (e) => {
    setEditedExpect(e.target.value)
  }

  const handleDetailChange = (e) => {
    setEditedDetail(e.target.value)
  }

  const handleCopyClick = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <MainContainer>
      {selectedQuestion && (
        <>
          <TopDiv>
            {isEditing ? (
              <WriteTitle>
                <p>Title</p>
                <InputTag type="text" value={editedTitle} onChange={handleTitleChange} />
                {editedTitle.length <= 15 && (
                  <WarningDiv>
                    <li>Title must be at least 15 characters.</li>
                  </WarningDiv>
                )}
              </WriteTitle>
            ) : (
              <>
                {editedTitle}
                <AskBtn>Ask Question</AskBtn>
              </>
            )}
          </TopDiv>
          {!isEditing && (
            <TopSubDiv>
              <DateDiv>
                <Span>Asked </Span>
                {detailDate(new Date(selectedQuestion.createdAt))}
              </DateDiv>
              <DateDiv>
                <Span>Modified </Span>
                {detailDate(new Date(selectedQuestion.modifiedAt))}
              </DateDiv>
              <DateDiv>
                <Span>Viewed </Span>
                {selectedQuestion.view} times
              </DateDiv>
            </TopSubDiv>
          )}

          <Mainwrapper>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <PTage>
                  {isEditing ? (
                    <WriteTitle>
                      <p>Detail</p>
                      <TextArea value={editedDetail} onChange={handleDetailChange} />
                      {editedDetail !== editedExpect || editedDetail.length === 0 ? (
                        ''
                      ) : (
                        <WarningDiv>
                          <li>Problem details and expected results must be different.</li>
                        </WarningDiv>
                      )}
                      {editedDetail.length < 20 && (
                        <>
                          <WarningDiv>
                            <li> Minimum 20 characters.</li>
                          </WarningDiv>
                        </>
                      )}
                    </WriteTitle>
                  ) : (
                    editedDetail
                  )}
                </PTage>
                <PTage>
                  {isEditing ? (
                    <WriteTitle>
                      <p>Expect</p>
                      <TextArea value={editedExpect} onChange={handleExpectChange} />
                      {editedDetail !== editedExpect || editedExpect.length === 0 ? '' : <WarningDiv>Problem details and expected results must be different.</WarningDiv>}
                      {editedExpect.length < 20 && (
                        <>
                          <WarningDiv>
                            <li> Minimum 20 characters.</li>
                          </WarningDiv>
                        </>
                      )}
                    </WriteTitle>
                  ) : (
                    editedExpect
                  )}
                </PTage>
                <Container>{selectedQuestion.tags && <Tags>{selectedQuestion.tags}</Tags>}</Container>
                <Container>
                  <LeftContainer>
                    <Btns onClick={handleOpenModal}>Share</Btns>
                    {isEditing ? (
                      <>
                        <Btns onClick={handleSaveClick} disabled={editedTitle.length <= 15 || editedDetail === editedExpect || editedDetail.length <= 20 || editedExpect.length <= 20}>
                          Save
                        </Btns>
                        <Btns onClick={handleCancelClick}>Cancel</Btns>
                      </>
                    ) : (
                      <Btns onClick={handleEditClick}>Edit</Btns>
                    )}
                    <Btns onClick={handleDeleteClick}>Delete</Btns>
                  </LeftContainer>
                  <RightContainer>
                    <div>asked {selectedQuestion.createdAt.slice(0, 10)}</div>
                    <div>{selectedQuestion.id}</div>
                  </RightContainer>
                </Container>

                {isModalOpen && (
                  <Bubble>
                    <p>Share a link to this question (Includes your user id)</p>
                    <InputTag value={window.location.href} readOnly />
                    <div>
                      <CopyToClipboard text={window.location.href}>
                        <ShareBtns onClick={handleCopyClick}>{isCopied ? 'Copied!' : 'Copy link'}</ShareBtns>
                      </CopyToClipboard>
                      <ShareBtns onClick={handleCloseModal}>Close</ShareBtns>
                    </div>
                  </Bubble>
                )}
              </>
            )}
          </Mainwrapper>

          <Comment />
        </>
      )}
    </MainContainer>
  )
}

export default QuestionDetail