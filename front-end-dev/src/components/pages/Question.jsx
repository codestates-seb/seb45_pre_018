import { useState } from "react";
import { styled } from "styled-components";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
`;

const H1Tag = styled.h1`
  background-image: url("../../public/blitz.jpg");
  background-size: cover;
  height: 130px;
  margin-bottom: 10px;
  padding: 24px;
`;

const HowToWrite = styled.div`
  padding: 24px;
  background-color: #ebf4fb;
  border-radius: 10px;
  border: 2px solid #bbe0fb;
  margin-bottom: 16px;
`;

const SecondPtag = styled.p`
  margin-bottom: 15px;
`;

const H4Tag = styled.h4`
  margin-bottom: 10px;
`;

const UlTag = styled.ul`
  margin-left: 30px;
`;

const WriteTitle = styled.div`
  padding: 24px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #bbe0fb;
  margin-bottom: 16px;
`;

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
`;

const InputTag = styled.input`
  width: 70%;
  height: 35px;
  border-radius: 10px;
  margin-top: 10px;
  border: 2px solid whitesmoke;
  padding: 10px;
  cursor: ${(props) => (props.isStep ? "auto" : "not-allowed")};
`;

const WriteForm = styled.div`
  padding: 24px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #bbe0fb;
  margin-bottom: 16px;
  opacity: ${(props) => (props.isStep ? 1 : 0.3)};
  cursor: ${(props) => (props.isStep ? "auto" : "not-allowed")};
`;

const LabelTag = styled.div`
  opacity: ${(props) => (props.isStep ? 1 : 0.3)};
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid gainsboro;
  margin-top: 20px;
  width: 70%;
  min-height: 200px;
  resize: vertical;
  cursor: ${(props) => (props.isStep ? "auto" : "not-allowed")};
`;

const Question = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [textLength, setTextLength] = useState(0);
  const [titleCheck, setTitleCheck] = useState("");

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1);
    setTextLength(0);
  };
  const textLengthHandler = (event) => {
    setTextLength(event.target.value.length);
  };
  const titleLengthHandler = (event) => {
    setTitleCheck(event.target.value.length);
  };

  return (
    <QuestionContainer>
      <H1Tag>Ask a public question</H1Tag>
      <HowToWrite>
        <h2>Writing a good question</h2>
        <p>
          You’re ready to ask a programming-related question and this form will
          help guide you through the process.
        </p>
        <SecondPtag>
          Looking to ask a non-programming question? See the topics here to find
          a relevant site.
        </SecondPtag>
        <H4Tag>Steps</H4Tag>
        <UlTag>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>
            Add “tags” which help surface your question to members of the
            community.
          </li>
          <li>Review your question and post it to the site.</li>
        </UlTag>
      </HowToWrite>
      <WriteTitle>
        <h3>Title</h3>
        <label>
          Be specific and imagine you’re asking a question to another person.
        </label>
        <InputTag
          type="text"
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          isStep={currentStep >= 1}
          onChange={titleLengthHandler}
        />
        {currentStep === 1 && (
          <NextBtn onClick={handleNextClick} textLength={20}>
            Next
          </NextBtn>
        )}
      </WriteTitle>

      <WriteForm isStep={currentStep >= 2} disabled={currentStep < 2}>
        <LabelTag isStep={currentStep >= 2}>
          <b>What are the details of your problem?</b>
          <p>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </p>
        </LabelTag>
        <TextArea
          minLength={20}
          isStep={currentStep >= 2}
          disabled={currentStep < 2}
          onChange={textLengthHandler}
        />
        {currentStep === 2 && (
          <NextBtn
            onClick={handleNextClick}
            disabled={textLength <= 20}
            textLength={textLength > 20}
          >
            Next
          </NextBtn>
        )}
      </WriteForm>

      <WriteForm isStep={currentStep >= 3} disabled={currentStep < 3}>
        <LabelTag isStep={currentStep >= 3}>
          <b>What did you try and what were you expecting?</b>
          <p>
            Describe what you tried, what you expected to happen, and what
            actually resulted. Minimum 20 characters.
          </p>
        </LabelTag>
        <TextArea
          minLength={20}
          isStep={currentStep >= 3}
          disabled={currentStep < 3}
          onChange={textLengthHandler}
        />
        {currentStep === 3 && (
          <NextBtn
            onClick={handleNextClick}
            disabled={textLength <= 20}
            textLength={textLength > 20}
          >
            Next
          </NextBtn>
        )}
      </WriteForm>

      <WriteForm isStep={currentStep >= 4} disabled={currentStep < 4}>
        <LabelTag isStep={currentStep >= 4}>
          <b>Tags</b>
          <p>
            Add up to 5 tags to describe what your question is about. Start
            typing to see suggestions.
          </p>
        </LabelTag>
        <InputTag
          type="text"
          placeholder="e.g (vba css mysql)"
          isStep={currentStep >= 4}
          disabled={currentStep < 4}
        ></InputTag>
        {currentStep === 4 && (
          <NextBtn
            onClick={handleNextClick}
            textLength={titleCheck.length !== 0 && 20}
            disabled={titleCheck.length < 1}
          >
            Review your question
          </NextBtn>
        )}
      </WriteForm>
    </QuestionContainer>
  );
};

export default Question;
