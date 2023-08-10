import { styled } from "styled-components";

const Side_bar = () => {
  const SideDiv = styled.div`
    position: sticky;
    top: 74px;
    display: flex;
    align-items: center;
    width: 160px;
    height: 200px;
    background-color: lightcyan;
    margin-left: 20px;
  `;
  return <SideDiv>Side-bar</SideDiv>;
};

export default Side_bar;
