import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import Scroll from "../Scroll";
import { styled } from "styled-components";
import { Outlet, useLocation } from "react-router-dom";

const Body = styled.div`
  display: flex;
  justify-content: center;
`;

const Root = () => {
  const location = useLocation();
  const hideSidebar = location.pathname.includes("/question");
  return (
    <>
      <Header />
      <Scroll />
      <Body>
        {!hideSidebar && <Sidebar />}
        <Outlet />
      </Body>
      <Footer />
    </>
  );
};

export default Root;
