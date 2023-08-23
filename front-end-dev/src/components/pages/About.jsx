import { useState } from 'react'
import { styled } from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 1300px;
  height: 2000px;
  margin: 20px 0 20px 0;
  font-size: 3rem;
`
const Italy = styled.div`
  margin-top: 30px;
  &:hover {
    color: #30bb75;
    cursor: pointer;
  }
`
const ColoredText = styled.span`
  color: ${(props) => props.color};
`

const About = () => {
  const [ison, setIson] = useState(true)
  const onoffHandler = () => {
    setIson((prev) => !prev)
  }
  return (
    <MainContainer>
      이탈리아의 날씨는?
      <Italy onClick={onoffHandler}>
        {ison ? (
          `클릭하시오`
        ) : (
          <>
            <ColoredText color="green">습</ColoredText>
            <ColoredText color="#e1e1e1">하</ColoredText>
            <ColoredText color="#e1e1e1">겠</ColoredText>
            <ColoredText color="red">띠?</ColoredText>
          </>
        )}
      </Italy>
    </MainContainer>
  )
}

export default About
