import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useInterval } from "../hooks/interval";

const ResultDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 9999;
  background-color: rgba(128, 128, 128, 0.8);
  font-size: 12pt;
  font-weight: bold;
  
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


const typingAnimation = keyframes`
  
`

const Result = (props: { success: boolean; result: string }) => {
  const [message,setMessage] = useState<string>('');
  const [count, setCount] = useState(0);
  useInterval(() => {
    if (count >= props.result.length) {
      return;
    }
  
    setMessage((prev) => {
      let result = prev ? prev + props.result[count] : props.result[0];
      setCount((prev) => prev + 1);
      return result;
    });
  }, 150);
  return <div>{props.success ? <ResultDiv><ResultP>{message}</ResultP></ResultDiv> : <div></div>}</div>;
};
export default Result;
