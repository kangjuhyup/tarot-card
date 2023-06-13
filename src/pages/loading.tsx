import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-in-out;
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
