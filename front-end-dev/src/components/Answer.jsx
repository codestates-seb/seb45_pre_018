import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import globalAxios from '../data/data'
import { useParams } from 'react-router-dom'

const AnswerContainer = styled.div`
  margin: 20px 0 20px 0;
  width: 1300px;
`

const AnswerForm = styled.form`
  display: flex;
  padding: 10px;
  flex-direction: column;
  margin: 20px 0;
  border-top: 1px solid #ddd;
`

const AnswerInput = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-top: 20px;
  min-height: 300px;
  margin: 0 40px;
  width: 85%;
`

const AnswerButton = styled.button`
  margin-top: 20px;
  align-self: flex-start;
  padding: 8px 16px;
  margin: 40px;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #005fa3;
  }
`

const AnswerItem = styled.div`
  border-top: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0 20px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const AnswerDiv = styled.div`
  display: flex;
  max-width: 800px;
  min-height: 300px;
  margin-left: 40px;
  padding: 10px;
`
const BtnContaniner = styled.div`
  margin: 40px;
`

const AnswerDeleteButton = styled.button`
  color: grey;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-right: 8px;
  cursor: pointer;
  background-color: white;
  &:hover {
    color: black;
  }
`

const AnswerEditButton = styled.button`
  color: grey;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  background-color: white;
  &:hover {
    color: black;
  }
`

const H2Tag = styled.h2`
  margin: 20px 20px 20px 40px;
`
const H3Tag = styled.h3`
  margin: 20px 20px 20px 40px;
`

const Answer = () => {
  const [questions, setQuestions] = useState([])
  const [answer, setAnswer] = useState()
  const [editingIndex, setEditingIndex] = useState(-1)
  const [editValue, setEditValue] = useState('')

  const { idx } = useParams()

  const [answerrr, setAnswerrr] = useState([])

  const selectedAnswer = answerrr.find((answer) => answer.id === idx) || { answers: [] }
  const answersArray = Array.isArray(selectedAnswer.answers) ? selectedAnswer.answers : [selectedAnswer.answers]

  const fetchAnswers = async () => {
    try {
      const response = await globalAxios.get(`questions/${idx}`)
      const data = response.data
      setAnswerrr(data.answers || [])
      setQuestions(data)
    } catch (error) {
      console.log('Error fetching answers:', error)
    }
  }
  useEffect(() => {
    // 서버에서 데이터를 가져오는 부분

    fetchAnswers()
  }, [idx])

  const handleAnswerSubmit = async (e) => {
    e.preventDefault()

    const updatedQuestion = {
      memberId: 1,
      id: 1,
      questionId: questions.questionId,
      content: answer,
      // answers: [...answersArray, answer], // 기존 답변 배열에 새로운 답변 추가
    }

    try {
      await globalAxios.post('answers', updatedQuestion) // 업데이트된 질문 객체를 서버에 보내어 업데이트
      fetchAnswers()
      setAnswer('')
    } catch (error) {
      console.log('Error updating question:', error)
      console.log(updatedQuestion)
    }
  }

  const changeHandler = (e) => {
    setAnswer(e.target.value)
  }

  const handleAnswerEdit = (index) => {
    setEditingIndex(index)
    setEditValue(answersArray[index])

    // await globalAxios.patch(`answers/${answerId}`, {
    //   content: editValue,
    // });
  }

  const handleAnswerDelete = async (answerId) => {
    try {
      await globalAxios.delete(`answers/${answerId}`)
      fetchAnswers()
    } catch (error) {
      console.log('Error deleting question:', error)
    }

    // localStorage.setItem('questions', JSON.stringify(updatedQuestions))
    // navigate(`/${idx}`)
  }

  return (
    <AnswerContainer>
      {console.log(questions.answers)}
      <H2Tag>Answers</H2Tag>
      <div>
        {questions.answers ? (
          questions.answers.map((ans, index) => (
            <AnswerItem key={index}>
              {editingIndex === index ? <AnswerInput value={editValue} onChange={(e) => setEditValue(e.target.value)} /> : <AnswerDiv>{ans.content}</AnswerDiv>}
              <BtnContaniner>
                {editingIndex === index ? (
                  <>
                    <AnswerEditButton
                      onClick={() => {
                        globalAxios.patch(`answers/${ans.answerId}`, {
                          content: editValue,
                        })
                        setEditingIndex(-1)
                      }}
                    >
                      Save
                    </AnswerEditButton>
                    <AnswerDeleteButton onClick={() => setEditingIndex(-1)}>Cancel</AnswerDeleteButton>
                  </>
                ) : (
                  <>
                    <AnswerEditButton onClick={() => handleAnswerEdit(index)}>Edit</AnswerEditButton>
                    <AnswerDeleteButton onClick={() => handleAnswerDelete(ans.answerId)}>Delete</AnswerDeleteButton>
                  </>
                )}
              </BtnContaniner>
            </AnswerItem>
          ))
        ) : (
          <p>Loading answers...</p>
        )}
      </div>

      <AnswerForm onSubmit={handleAnswerSubmit}>
        <H3Tag>Your Answer</H3Tag>
        <AnswerInput placeholder="" value={answer} onChange={changeHandler} rows={4} />
        <AnswerButton type="submit">Post Your Answer</AnswerButton>
      </AnswerForm>
    </AnswerContainer>
  )
}

export default Answer
