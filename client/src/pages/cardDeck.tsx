import { useMemo } from "react";
import styled from "styled-components";
import Card from "../components/card";
import ShuffleButton from "../components/shuffleButton";
import CardDeckController from "./controller/cardDeck.controller";
import LogIn from "./logIn";

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

const CardDeck = (props: { setDto: any }) => {
  const {
    cards,
    startShuffling,
    clickCard,
    isShuffled,
    isClicked,
    isShuffling,
    isRun,
    round,
  } = CardDeckController(props);

  const memoizedCards = useMemo(
    () =>
      cards.map((card, index) => (
        <Card
          key={index}
          num={index}
          zIndex={index}
          isForward={card.isForward}
          isShuffling={isShuffling[card.index]}
          isRun={isRun}
          pickNum={card.pickNum}
          cardStyle={
            isShuffled
              ? card.isPicked
                ? isRun
                  ? {
                      // isShuffled:true, card.isPicked: true, isRun: true
                      transform: `
                      translate(${(card.pickNum! - 1) * 110}px)
                      `,
                    }
                  : {
                      // isShuffled:true, card.isPicked: true, isRun: false
                      transform: `
                    translate(${card.x}px, ${card.y + 150}px)
                  `,
                    }
                : {
                    // isShuffled:true, card.isPicked: false
                    transform: `
                  translate(${card.x}px, ${card.y}px) 
                  rotate(${
                    (index - cards.length / 2) * (180 / cards.length)
                  }deg)`,
                    transformOrigin: "50% 50%",
                  }
              : {} // isShuffled:false
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
      ) : round === 0 ? (
        <LogIn />
      ) : (
        <ShuffleButton click={startShuffling} isClicked={isClicked} />
      )}
    </CardStack>
  );
};

export default CardDeck;
