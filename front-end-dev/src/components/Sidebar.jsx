import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Sidebar = () => {
  const SideDiv = styled.div`
    position: sticky;
    top: 74px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 400px;
    background-color: lightcyan;
    margin-left: 20px;
  `;

  const StyledLink = styled(Link)`
    font-weight: bold;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    width: 100%;
    &:hover {
      background-color: #ffffff;
    }
  `;
  return (
    <SideDiv>
      <StyledLink to="/">
        <div>Home</div>
      </StyledLink>
    </SideDiv>
  );
};

export default Sidebar;
