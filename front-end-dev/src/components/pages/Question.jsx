// import BlitzImage from "../../public/blitz.jpg";
import { styled } from "styled-components";
// const BackImg = styled.div`
//   background-image: url("../../public/blitz.jpg");
//   width: 100%;
//   height: 100%;
// `;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1500px;
  width: 100%;

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

const InputTag = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 10px;
  margin-top: 10px;
  border: 2px solid whitesmoke;
  padding: 10px;
`;

const WriteDetail = styled.div`
  padding: 24px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #bbe0fb;
  margin-bottom: 16px;
`;

const Question = () => {
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
        />
      </WriteTitle>

      <WriteDetail>
        <label>
          What are the details of your problem?
          <p>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </p>
        </label>
      </WriteDetail>
    </QuestionContainer>
  );
};

export default Question;
