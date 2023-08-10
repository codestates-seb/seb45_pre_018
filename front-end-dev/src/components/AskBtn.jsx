import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const AskedBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #0a95ff;
  color: white;
  padding: 20px;

  &:hover {
    background-color: #0971cc;
  }
`;
const AskBtn = ({ setIsClicked }) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/question");
    setIsClicked(true);
  };
  return <AskedBtn onClick={navigateHandler}>Ask Question</AskedBtn>;
};

AskBtn.propTypes = {
  setIsClicked: PropTypes.func.isRequired,
};

export default AskBtn;
