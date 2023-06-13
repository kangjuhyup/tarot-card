import { url } from "inspector";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const shuffleAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(200px);
  }
  100% {
    transform: translateY(0);
  }
`;

const pickAniation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(500px);
  }
`;

const CardWrapper = styled.div`
  position: absolute;
  top: 50px;
  width: 100px;
  height: 175px;
  background-image: url();
  background-size: cover;
  border: 1px solid #000000;
  border-radius: 4px;
  transition: transform 300ms ease;

  &.shuffle {
    animation: ${shuffleAnimation} 300ms ease;
  }

  &.pick {
    animation: ${pickAniation} 3s;
  }
`;

export interface Cardprops {
  num: number;
  isForward: boolean;
  zIndex: number;
  isShuffling: boolean;
  cardStyle: React.CSSProperties;
  clickHandler: (num: number) => { isClicked: boolean; isForward: boolean };
}
const Card = React.memo(
  ({ num, isForward, isShuffling, cardStyle, clickHandler }: Cardprops) => {
    const [zIdx, setZIdx] = useState(0);
    const [isPicked, setPicked] = useState(false);
    const [background, setBackground] = useState("/images/tarot_back.jpeg");
    const clickCard = (num: number) => {
      const { isClicked } = clickHandler(num);
      if (isClicked) {
        if (isForward) {
          setBackground(`/images/tarot/${num}.jpeg`);
        } else {
          setBackground(`/images/tarot/tarot180/${num}.jpeg`);
        }
        setPicked(true);
        setZIdx(1000);
      }
    };

    useEffect(() => {
      setZIdx(zIdx);
    }, [zIdx]);

    return (
      <CardWrapper
        className={`card ${isShuffling ? "shuffle" : ""}`}
        style={{
          zIndex: `${zIdx}`,
          ...cardStyle,
          backgroundImage: `url(${background})`,
        }}
        onClick={() => {
          clickCard(num);
        }}
      ></CardWrapper>
    );
  }
);
export default Card;
