import { styled } from "styled-components";

const Sidebar = () => {
  const SideDiv = styled.div`
    position: sticky;
    top: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 400px;
    background-color: lightcyan;
    margin-left: 20px;
  `;
  return <SideDiv>Side-bar</SideDiv>;
};

export default Sidebar;
