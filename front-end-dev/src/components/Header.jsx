import logo from "/logo-stackoverflow.png";

import { styled } from "styled-components";
import { Link } from "react-router-dom";
const Nav = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: white;
`;

const Logoimg = styled.img`
  width: 200px;
  height: 50px;
  margin-right: 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 10px;

  &:hover {
    background-color: #eee6e6;
  }
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-right: 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 10px;

  &:hover {
    background-color: #eee6e6;
  }
`;

const RightDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Buttons = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  width: 80px;
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

const Header = () => {
  return (
    <Nav>
      <Link to={"/"}>
        <div>
          <Logoimg src={logo} />
        </div>
      </Link>
      <Left>
        <LeftDiv>About</LeftDiv>
        <LeftDiv>Products</LeftDiv>
        <LeftDiv>For Teams</LeftDiv>
      </Left>

      <div></div>

      <RightDiv>
        <Buttons color="#39739d" backgroundColor="#E1ECF4" hoverColor="#A8C5E0">
          Log in
        </Buttons>
        <Buttons color="#FFFFFF" backgroundColor="#0A95FF" hoverColor="#0971CC">
          Sign up
        </Buttons>
      </RightDiv>
    </Nav>
  );
};

export default Header;
