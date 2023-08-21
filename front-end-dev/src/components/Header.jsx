import logo from "/logo-stackoverflow.png";

import { styled } from "styled-components";
import { Link } from "react-router-dom";
import LoginBtn from './LoginBtn'
import { useState,useEffect } from "react";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: white;
  z-index: 100;
  border-bottom: 1px solid #ccc;
`;
const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4f4f4f;
  &:hover {
    color: black;
  }
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

  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};

  &:hover {
    background-color: ${(props) => props.hovercolor};
  }
`;

const userData = [
  {
    id: "1",
    isLogin: false,
    full_name: "jason",
    email: "1",
    gender: "male",
    date_of_birth: "2022.03.03",
    country_code: "",
    created_at: "",
    password: "1",
  },
  {
    id: "2",
    full_name: "akiho",
    email: "sirasu@yahoo.com",
    gender: "female",
    date_of_birth: "2022.04.04",
    country_code: "81",
    created_at: "",
    password: "123456",
  },
];
localStorage.setItem("user", JSON.stringify(userData));


const Header = () => {
  const [islogin, setislogin] = useState(false);

  const getData = JSON.parse(localStorage.getItem("login"));
  console.log(getData);
  useEffect(() => {
    if (getData === "good") {
      setislogin(true);
    } else {
      setislogin(false);
    }
  }, [getData]);
  const logoutHandler = () => {
    setislogin(false);
    localStorage.setItem("login", JSON.stringify(""));
    alert("로그아웃");
  };
  return (
    <Nav>
      <Link to="/">
        <div>
          <Logoimg src={logo} />
        </div>
      </Link>
      <Left>
        <StyledLink to="/about">
          <LeftDiv>About</LeftDiv>
        </StyledLink>
        <StyledLink to="/product">
          <LeftDiv>Products</LeftDiv>
        </StyledLink>
        <StyledLink to="/forTeam">
          <LeftDiv>For Teams</LeftDiv>
        </StyledLink>
      </Left>

      <div></div>

      <RightDiv>
      {islogin ? (
          <Buttons
            color="#39739d"
            backgroundColor="#E1ECF4"
            hoverColor="#A8C5E0"
            onClick={logoutHandler}
          >
            Log out
          </Buttons>
        ) : (
          <LoginBtn />
        )}
        
      </RightDiv>
    </Nav>
  );
};

export default Header;
