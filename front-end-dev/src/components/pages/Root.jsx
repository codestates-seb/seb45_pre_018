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
      <div className="hi">
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
