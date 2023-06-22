import { useEffect } from "react";
import styled from "styled-components";
import ResultController from "./contorller/result.controller";

const ResultDiv = styled.div`
  position: absolute;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background-color: rgba(128, 128, 128, 0.8);
  font-size: 12pt;
  font-weight: bold;
  max-width: 400pt;
  color: white;
`;

const ResultP = styled.p`
  padding: 10px;
  word-break: break-all;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 15pt;
    background-color: white;
    animation: typingAnimation 300ms infinite;
  }

  @keyframes typingAnimation {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Result = (props:{message:string}) => {
  useEffect(() => {
    console.log(props.message);
  },[props.message])
  const { result } = ResultController(props);
  return (
            <ResultDiv>
              <ResultP>{result}</ResultP>
            </ResultDiv>
  );
};
export default Result;
