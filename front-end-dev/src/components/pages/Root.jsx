import Header from "../Header";

import Footer from "../Footer";
import { styled } from "styled-components";
import { Outlet } from "react-router-dom";

const Body = styled.div`
  display: flex;
  justify-content: center;
`;

const Root = () => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <Header />
        <Body>
          <Outlet />
        </Body>
        <Footer />
      </div>
    </>
  );
};

export default Root;
