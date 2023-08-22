import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import globalAxios from '../../data/data'

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
`

const H1Tag = styled.h1`
  background-image: url('/blitz.jpg');
  background-size: cover;
  height: 130px;
  margin-bottom: 10px;
  padding: 24px;
`

const HowToWrite = styled.div`
  padding: 24px;
  background-color: #ebf4fb;
  border-radius: 10px;
  border: 2px solid #bbe0fb;
  margin-bottom: 16px;
`

const SecondPtag = styled.p`
  margin-bottom: 15px;
`

const H4Tag = styled.h4`
  margin-bottom: 10px;
`

const UlTag = styled.ul`
  margin-left: 30px;
`

const WriteTitle = styled.div`
  padding: 24px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #bbe0fb;
  margin-bottom: 16px;
`

const NextBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #0a95ff;
  color: white;
  padding: 20px;
  margin-top: 10px;
  opacity: ${(props) => (props.textLength ? 1 : 0.3)};
  &:hover {
    background-color: #0971cc;
  }
`

const InputTag = styled.input`
  width: 70%;
  height: 35px;
  border-radius: 10px;
  margin-top: 10px;
  border: 2px solid whitesmoke;
  padding: 10px;
  cursor: ${(props) => (props.isstep ? 'auto' : 'not-allowed')};
`

const WriteForm = styled.div`
  padding: 24px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #bbe0fb;
  margin-bottom: 16px;
  opacity: ${(props) => (props.isstep ? 1 : 0.3)};
  cursor: ${(props) => (props.isstep ? 'auto' : 'not-allowed')};
`

const LabelTag = styled.div`
  opacity: ${(props) => (props.isstep ? 1 : 0.3)};
`

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid gainsboro;
  margin-top: 20px;
  width: 70%;
  min-height: 200px;
  resize: vertical;
  cursor: ${(props) => (props.isstep ? 'auto' : 'not-allowed')};
`

const TitleLengthCheckDive = styled.div`
  display: flex;
  justify-content: space-between;
`
const ToolongText = styled.div`
  color: red;
`
const Question = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [titleCheck, setTitleCheck] = useState('')
  const [detailCheck, setDetailCheck] = useState('')
  const [expectCheck, setExpectCheck] = useState('')
  const [tagCheck, setTagCheck] = useState('')
  const [index, setIndex] = useState(1)

  const navigate = useNavigate()

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1)
  }
  const titleHandler = (event) => {
    setTitleCheck(event.target.value)
  }
  const detailHandler = (event) => {
    setDetailCheck(event.target.value)
  }
  const expectHandler = (event) => {
    setExpectCheck(event.target.value)
  }
  const tagHandler = (event) => {
    setTagCheck(event.target.value)
  }

  const postQuestion = async (data) => {
    try {
      const response = await globalAxios.post('/questions', data)
      console.log('response >>', response)
      navigate('/')
    } catch (err) {
      console.log('Error >>', err)
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setIndex((prev) => prev + 1)
    const seoulTime = new Date()
    seoulTime.setHours(seoulTime.getHours() + 9)
    const newQuestion = {
      questionId: index,
      title: titleCheck,
      content: detailCheck,
      expect: expectCheck,
      tags: tagCheck,
      createdAt: seoulTime.toISOString(),
      modifiedAt: seoulTime.toISOString(),
      view: 0,
      answers: [],
      answer_count: 0,
      memberId: 1,
    }

    postQuestion(newQuestion)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <QuestionContainer>
      <form onSubmit={onSubmitHandler}>
        <H1Tag>Ask a public question</H1Tag>

        <HowToWrite>
          <h2>Writing a good question</h2>
          <p>You’re ready to ask a programming-related question and this form will help guide you through the process.</p>
          <SecondPtag>Looking to ask a non-programming question? See the topics here to find a relevant site.</SecondPtag>
          <H4Tag>Steps</H4Tag>
          <UlTag>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Add “tags” which help surface your question to members of the community.</li>
            <li>Review your question and post it to the site.</li>
          </UlTag>
        </HowToWrite>

        <WriteTitle>
          <h3>Title</h3>
          <TitleLengthCheckDive>
            <label>Be specific and imagine you’re asking a question to another person.</label>
            {titleCheck.length > 150 && <ToolongText>Too long by 150 characters</ToolongText>}
          </TitleLengthCheckDive>
          <InputTag type="text" value={titleCheck} placeholder="e.g. Is there an R function for finding the index of an element in a vector?" isstep={currentStep >= 1} onChange={titleHandler} />

          <>
            {titleCheck.length <= 15 && (
              <ToolongText>
                <li>Title must be at least 15 characters.</li>
              </ToolongText>
            )}
          </>

          {currentStep === 1 && (
            <NextBtn onClick={handleNextClick} textLength={titleCheck.length > 15} disabled={titleCheck.length <= 15}>
              Next
            </NextBtn>
          )}
        </WriteTitle>

        <>
          <WriteForm isstep={currentStep >= 2} disabled={currentStep < 2}>
            <LabelTag isstep={currentStep >= 2}>
              <b>What are the details of your problem?</b>
              <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
            </LabelTag>

            <TextArea value={detailCheck} minLength={20} isstep={currentStep >= 2 ? 'true' : 'false'} disabled={currentStep < 2} onChange={detailHandler} />

            {detailCheck !== expectCheck || detailCheck.length === 0 ? (
              <>
                {currentStep === 2 && (
                  <NextBtn onClick={handleNextClick} disabled={detailCheck.length <= 20} textLength={detailCheck.length > 20}>
                    Next
                  </NextBtn>
                )}
              </>
            ) : (
              detailCheck.length !== 0 && <ToolongText>Problem details and expected results must be different.</ToolongText>
            )}
          </WriteForm>

          <WriteForm isstep={currentStep >= 3} disabled={currentStep < 3}>
            <LabelTag isstep={currentStep >= 3}>
              <b>What did you try and what were you expecting?</b>
              <p>Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters.</p>
            </LabelTag>
            <TextArea value={expectCheck} minLength={20} isstep={currentStep >= 3} disabled={currentStep < 3} onChange={expectHandler} />

            {detailCheck !== expectCheck ? (
              <>
                {currentStep === 3 && (
                  <NextBtn onClick={handleNextClick} disabled={expectCheck.length <= 20} textLength={expectCheck.length > 20}>
                    Next
                  </NextBtn>
                )}
              </>
            ) : (
              expectCheck.length !== 0 && <ToolongText>Problem details and expected results must be different.</ToolongText>
            )}
          </WriteForm>
        </>

        <WriteForm isstep={currentStep >= 4} disabled={currentStep < 4}>
          <LabelTag isstep={currentStep >= 4}>
            <b>Tags</b>
            <p>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
          </LabelTag>
          <InputTag type="text" value={tagCheck} placeholder="e.g (vba css mysql)" isstep={currentStep >= 4} disabled={currentStep < 4} onChange={tagHandler}></InputTag>
          {currentStep === 4 && (
            <NextBtn
              // type="submit"
              textLength={titleCheck.length > 15 && detailCheck !== expectCheck}
              disabled={titleCheck.length <= 15 || detailCheck === expectCheck}
            >
              Review your question
            </NextBtn>
          )}
        </WriteForm>
      </form>
    </QuestionContainer>
  )
}

export default Question
