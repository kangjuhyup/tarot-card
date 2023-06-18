import styled from "styled-components";
import Kakao from "../components/kakao";

const LogInDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  width: 100%;
  bottom: 0;
`;

const LogIn = () => {
  return (
    <LogInDiv>
      <Kakao />
    </LogInDiv>
  );
};

export default LogIn;
