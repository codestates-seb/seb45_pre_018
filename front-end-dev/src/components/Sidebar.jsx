import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Sidebar = () => {
  const SideDiv = styled.div`
    position: sticky;
    top: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;
    height: 100vh;

    margin-left: 20px;
    border-right: 1px solid #ccc;
  `;

  const StyledLink = styled(Link)`
    font-weight: bold;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4%;
    width: 100%;
    margin-top: 20px;
    color: #4f4f4f;
    &:hover {
      color: black;
    }
  `;
  const IconDiv = styled.div`
    display: flex;
    align-items: center;
  `;
  return (
    <SideDiv>
      <StyledLink to="/">
        <IconDiv>
          <span className="material-symbols-outlined">home</span>Home
        </IconDiv>
      </StyledLink>
      <StyledLink to="/about">
        <div>About</div>
      </StyledLink>
      <StyledLink to="/product">
        <div>Products</div>
      </StyledLink>
      <StyledLink to="/forTeam">
        <div>For Teams</div>
      </StyledLink>
    </SideDiv>
  );
};

export default Sidebar;
