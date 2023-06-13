import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Card from "../components/card";
import CardDeckController from "./controller/cardDeck";

const CardStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
`;

const ShuffleButtonGroup = styled.div`
  position: relative;
  width: 100vw;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ShuffleButton = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
  bottom: 0;

  @media (max-width: 600px) {
    margin-top: 8px;
    width: 100%;
    position: static;
  }
`;

const CardDeck = (props: { setDto: any }) => {

  const {cards,startShuffling,clickCard,isShuffled,isClicked,isShuffling} = CardDeckController(props);
  
  const memoizedCards = useMemo(
    () =>
      cards.map((card, index) => (
        <Card
          key={index}
          num={index}
          zIndex={index}
          isForward={card.isForward}
          isShuffling={isShuffling[card.index]}
          cardStyle={
            isShuffled
              ? card.isPicked
                ? {
                    transform: `
                    translate(${card.x}px, ${card.y + 150}px)
                  `,
                  }
                : {
                    transform: `
                  translate(${card.x}px, ${card.y}px) 
                  rotate(${(index - cards.length / 2) * (180 / cards.length)}deg)`,
                    transformOrigin: "50% 50%",
                  }
              : {}
          }
          clickHandler={clickCard}
        />
      )),
    [cards, isShuffling, isShuffled, cards.length]
  );

  return (
    <CardStack>
      {memoizedCards}
      {isClicked ? (
        <></>
      ) : (
        <ShuffleButtonGroup>
          <ShuffleButton
            style={{ display: isClicked ? "none" : "visible" }}
            onClick={() => startShuffling(0)}
          >
            사랑
          </ShuffleButton>
          <ShuffleButton
            style={{ display: isClicked ? "none" : "visible" }}
            onClick={() => startShuffling(1)}
          >
            커리어
          </ShuffleButton>
          <ShuffleButton
            style={{ display: isClicked ? "none" : "visible" }}
            onClick={() => startShuffling(2)}
          >
            금전
          </ShuffleButton>
          <ShuffleButton
            style={{ display: isClicked ? "none" : "visible" }}
            onClick={() => startShuffling(3)}
          >
            건강
          </ShuffleButton>
        </ShuffleButtonGroup>
      )}
    </CardStack>
  );
};

export default CardDeck;
