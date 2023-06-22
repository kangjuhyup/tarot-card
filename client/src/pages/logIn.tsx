import styled from "styled-components";
import Kakao from "../components/kakao";

const LogInDiv = styled.div`
  position: fixed;
  flex: 1;
  top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  width: 100%;
`;

const LogIn = () => {
  return (
    <LogInDiv>
      <Kakao />
    </LogInDiv>
  );
};

export default LogIn;
