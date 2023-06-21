import styled from "styled-components";
import ResultController, { ResultProps } from "./contorller/result.controller";

const ResultDiv = styled.div`
  position: relative;
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

const Result = (props: ResultProps) => {
  const { round, message } = ResultController(props);
  return (
    <div>
      {round === 0 ? (
        <ResultDiv>
          <ResultP>로그인 후 이용할 수 있습니다.</ResultP>
        </ResultDiv>
      ) : round === 1 ? (
        <ResultDiv>
          <ResultP>어떤 점을 보고싶으신가요?</ResultP>
        </ResultDiv>
      ) : round === 2 ? (
        <ResultDiv>
          <ResultP>세장의 카드를 선택해주세요.</ResultP>
        </ResultDiv>
      ) : (
        <div>
          {props.success ? (
            <ResultDiv>
              <ResultP>{message}</ResultP>
            </ResultDiv>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
export default Result;
