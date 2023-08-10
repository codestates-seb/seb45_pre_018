import Header from "../Header";
import Side_bar from "../Sidebar";
import Main from "../Main";
import { styled } from "styled-components";
import { useState } from "react";
const Body = styled.div`
  display: flex;
  height: 3000px;
`;

const Root = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div style={{ width: "100%" }}>
        <div style={{ width: "1500px" }}>
          <Header setIsClicked={setIsClicked} />
          <Body>
            {isClicked ? (
              "hi"
            ) : (
              <>
                <Side_bar />
                <Main setIsClicked={setIsClicked} />
              </>
            )}
          </Body>
        </div>
      </div>
    </>
  );
};

export default Root;
