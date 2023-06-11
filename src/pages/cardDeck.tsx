import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Card from "../components/card";

const CardStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShuffleButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 16px;
  position: absolute;
  bottom: 0px;
`;

const CardDeck = () => {
  const cardNum: number = 78;
  const [cards, setCards] = useState<
    { index: number; x: number; y: number; isPicked: boolean }[]
  >(() =>
    Array.from({ length: cardNum }, (_, index) => ({
      index: index,
      x: 0,
      y: 0,
      isPicked: false,
    }))
  );

  const [isClicked, setClicked] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean[]>(
    Array(cardNum).fill(false)
  );

  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  const [pickedCount, setPickedCount] = useState<number>(0);

  const setShowCards = () => {
    const angleIncrement = (Math.PI * 1) / cardNum;
    const radius = 200;
    const centerX = 0;
    const centerY = 0;

    cards.forEach((_, index) => {
      const angle = index * angleIncrement;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      setTimeout(() => {
        setIsShuffling((prevState) => {
          const newState = [...prevState];
          newState[index] = false;
          return newState;
        });
      }, index * 100);

      setCards((prevState) => {
        const newState = [...prevState];
        newState[index] = {
          index: newState[index].index,
          x,
          y,
          isPicked: false,
        };
        return newState;
      });
      setIsShuffled(true);
    });
  };

  const startShuffling = () => {
    setClicked(true);
    const shuffledCards = cards.slice().sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    for (let i = 0; i < cardNum / 2; i++) {
      setTimeout(() => {
        setIsShuffling((prevState) => {
          const newState = [...prevState];
          newState[i] = true;
          return newState;
        });
      }, i * 200);
    }

    setTimeout(() => {
      setShowCards();
    }, (cardNum / 2) * 210);
  };

  const clickCard = (num: number) => {
    if (pickedCount < 3) {
      setCards((prevState) => {
        const newState = [...prevState];
        newState[num].isPicked = true;
        return newState;
      });
      setPickedCount(pickedCount + 1);
      return true;
    }
    return false;
  };

  useEffect(() => {
    console.log(`isClicked : `, isClicked);
  }, [isClicked]);

  return (
    <CardStack>
      {cards.map((card, index) => (
        <Card
          key={index}
          num={index}
          zIndex={index}
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
                  rotate(${(index - cardNum / 2) * (180 / cardNum)}deg)`,
                    transformOrigin: "50% 50%",
                  }
              : {}
          }
          clickHandler={clickCard}
        />
      ))}
      {isClicked ? (
        <></>
      ) : (
        <ShuffleButton
          style={{ display: isClicked ? "none" : "visible" }}
          onClick={startShuffling}
        >
          Shuffle
        </ShuffleButton>
      )}
    </CardStack>
  );
};

export default CardDeck;
