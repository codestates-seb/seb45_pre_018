import logo from "/logo-stackoverflow.png";

import { styled } from "styled-components";
import { Link } from "react-router-dom";
import LoginBtn from './LoginBtn'
import { useState } from "react";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: white;
  z-index: 100;
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






  const userData = [
    
    
    {
    id:'1',
    isLogin: false,
    full_name:'jason',
  email:'jason1@gmail.com',gender:'male',date_of_birth:'2022.03.03',
  country_code:'',created_at:'',password:'123456'
  },
  {id:"2",full_name:'akiho',email:'sirasu@yahoo.com',gender:'female'
  ,date_of_birth:'2022.04.04'
  ,country_code:"81",created_at:'',password:'123456'}];

  localStorage.setItem('user',JSON.stringify(userData));




const Header = () => {
  return (
    <Nav>
      <Link to="/">
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
        <LoginBtn/>
        
      </RightDiv>
    </Nav>
  );
};

export default Header;
