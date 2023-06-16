import styled from "styled-components";

const ShuffleButtonGroup = styled.div`
  position: absolute;
  width: 100vw;
  height: auto;
  bottom: 0;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
`;

const Buttton = styled.button`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;

  @media (max-width: 600px) {
    margin-top: 8px;
    width: 100%;
    position: static;
  }
`;

interface Props {
    isClicked : boolean;
    click : (idx:number) => void
}

const ShuffleButton = ({isClicked,click}:Props) => {
  return (
    <ShuffleButtonGroup>
      <Buttton
        style={{ display: isClicked ? "none" : "visible" }}
        onClick={() => click(0)}
      >
        사랑
      </Buttton>
      <Buttton
        style={{ display: isClicked ? "none" : "visible" }}
        onClick={() => click(1)}
      >
        커리어
      </Buttton>
      <Buttton
        style={{ display: isClicked ? "none" : "visible" }}
        onClick={() => click(2)}
      >
        금전
      </Buttton>
      <Buttton
        style={{ display: isClicked ? "none" : "visible" }}
        onClick={() => click(3)}
      >
        건강
      </Buttton>
    </ShuffleButtonGroup>
  );
};
export default ShuffleButton;
