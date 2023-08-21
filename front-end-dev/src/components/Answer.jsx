import { useState, useEffect } from 'react'
import { styled } from 'styled-components'

const AnswerContainer = styled.div`
  margin-top: 20px;
`

const AnswerForm = styled.form`
  display: flex;
  padding: 10px;
  flex-direction: column;
  margin-bottom: 10px;
`

const AnswerInput = styled.textarea`
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`

const AnswerButton = styled.button`
  margin-top: 20px;
  align-self: flex-start;
  padding: 8px 16px;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #005fa3;
  }
`

const AnswerList = styled.ul`
  list-style: none;
  padding: 10;
  margin-bottom: 30px;
`

const AnswerItem = styled.li`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AnswerDeleteButton = styled.button`
  background-color: none;
  color: grey;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
  cursor: pointer;
`

const AnswerEditButton = styled.button`
  color: grey;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
`

const Answer = () => {
  const [answers, setAnswers] = useState([])
  const [answer, setAnswer] = useState('')
  const [editingIndex, setEditingIndex] = useState(-1)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers')) || []
    setAnswers(savedAnswers)
  }, [])

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers))
  }, [answers])

  const handleAnswerSubmit = (e) => {
    e.preventDefault()
    if (editingIndex !== -1) {
      // If editing, update the answer
      const newAnswers = [...answers]
      newAnswers[editingIndex] = editValue
      setAnswers(newAnswers)
      setEditingIndex(-1)
      setEditValue('')
    } else {
      // If not editing, add a new answer
      setAnswers([...answers, answer])
      setAnswer('')
    }
  }

  const handleAnswerDelete = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index)
    setAnswers(newAnswers)
  }

  const handleAnswerEdit = (index, value) => {
    setEditingIndex(index)
    setEditValue(value)
  }

  return (
    <AnswerContainer>
      <AnswerList>
        {answers.map((answer, index) => (
          <AnswerItem key={index}>
            {editingIndex === index ? <AnswerInput value={editValue} onChange={(e) => setEditValue(e.target.value)} /> : <div>{answer}</div>}
            <div>
              {editingIndex === index ? <AnswerButton onClick={handleAnswerSubmit}>Save</AnswerButton> : <AnswerEditButton onClick={() => handleAnswerEdit(index, answer)}>Edit</AnswerEditButton>}
              <AnswerDeleteButton onClick={() => handleAnswerDelete(index)}>Delete</AnswerDeleteButton>
            </div>
          </AnswerItem>
        ))}
      </AnswerList>
      <h3>Your Answer</h3>
      <AnswerForm onSubmit={handleAnswerSubmit}>
        <AnswerInput placeholder="" value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} />
        <AnswerButton type="submit">{editingIndex !== -1 ? 'Save Edit' : 'Post Your Answer'}</AnswerButton>
      </AnswerForm>
    </AnswerContainer>
  )
}

export default Answer
