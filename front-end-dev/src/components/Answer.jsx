import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'

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
  const [answer, setAnswer] = useState()
  const [editingIndex, setEditingIndex] = useState(-1)
  const [editValue, setEditValue] = useState('')

  const { idx } = useParams()
  const navigate = useNavigate()
  const answerrr = JSON.parse(localStorage.getItem('questions')) || []

  const selectedAnswer = answerrr.find((answer) => answer.id === idx) || { answers: [] }
  const answersArray = Array.isArray(selectedAnswer.answers) ? selectedAnswer.answers : [selectedAnswer.answers]
  const handleAnswerSubmit = (e) => {
    e.preventDefault()

    const updatedQuestions = answerrr.map((question) => {
      if (question.id === idx) {
        return {
          ...question,
          answers: [...question.answers, answer],
        }
      }
      return question
    })
    console.log('hi')

    localStorage.setItem('questions', JSON.stringify(updatedQuestions))
    setAnswer('')
  }

  const changeHandler = (e) => {
    setAnswer(e.target.value)
  }

  const handleAnswerEdit = (index) => {
    setEditingIndex(index)
    setEditValue(answersArray[index])
  }

  const handleAnswerDelete = (index) => {
    const updatedAnswers = [...answersArray]
    updatedAnswers.splice(index, 1)

    const updatedQuestions = answerrr.map((question) => {
      if (question.id === idx) {
        return {
          ...question,
          answers: updatedAnswers,
        }
      }
      return question
    })

    localStorage.setItem('questions', JSON.stringify(updatedQuestions))
    navigate(`/${idx}`)
  }

  return (
    <AnswerContainer>
      <H2Tag>Answers</H2Tag>
      <div>
        {answersArray.map((ans, index) => (
          <AnswerItem key={index}>
            {editingIndex === index ? <AnswerInput value={editValue} onChange={(e) => setEditValue(e.target.value)} /> : <AnswerDiv>{ans}</AnswerDiv>}
            <BtnContaniner>
              {editingIndex === index ? (
                <>
                  <AnswerEditButton
                    onClick={() => {
                      const updatedAnswers = [...answersArray]
                      updatedAnswers[index] = editValue

                      const updatedQuestions = answerrr.map((question) => {
                        if (question.id === idx) {
                          return {
                            ...question,
                            answers: updatedAnswers,
                          }
                        }
                        return question
                      })

                      localStorage.setItem('questions', JSON.stringify(updatedQuestions))
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
                  <AnswerDeleteButton onClick={() => handleAnswerDelete(index)}>Delete</AnswerDeleteButton>
                </>
              )}
            </BtnContaniner>
          </AnswerItem>
        ))}
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
