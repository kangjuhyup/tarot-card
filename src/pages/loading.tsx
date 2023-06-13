import React from "react";
import styled, { keyframes } from "styled-components";

// 페이드인 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 로딩 화면을 감싸는 컨테이너
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8); /* 알파 80% 투명도 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* 다른 요소들보다 위에 표시되도록 설정 */
  animation: ${fadeIn} 0.3s ease-in-out; /* 페이드인 애니메이션 적용 */
`;

// 로딩 메시지
const LoadingMessage = styled.p`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

const Loading = () => {
  return (
      
    <LoadingOverlay>
      <LoadingMessage>Loading...</LoadingMessage>
    </LoadingOverlay>
  );
};

export default Loading;
