import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Card from "../components/card";

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
  const cardNum: number = 78;
  const [type, setType] = useState<number>(0);
  const [cards, setCards] = useState<
    {
      index: number;
      x: number;
      y: number;
      isPicked: boolean;
      isForward: boolean;
    }[]
  >(() =>
    Array.from({ length: cardNum }, (_, index) => ({
      index: index,
      x: 0,
      y: 0,
      isPicked: false,
      isForward: Math.random() < 0.5,
    }))
  );

  const [isClicked, setClicked] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean[]>(
    Array(cardNum).fill(false)
  );

  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  interface PickedCard {
    num: number;
    isForward: boolean;
  }
  const [pickedCard, setPickedCard] = useState<PickedCard[]>([]);

  const clickCard = (num: number) => {
    if (pickedCard.length < 3) {
      setCards((prevState) => {
        const newState = [...prevState];
        newState[num].isPicked = true;
        return newState;
      });
      setPickedCard([
        ...pickedCard,
        { num: num, isForward: cards[num].isForward },
      ]);
      return { isClicked: true, isForward: false };
    }
    return { isClicked: false, isForward: false };
  };

  const setShowCards = () => {
    const angleIncrement = (Math.PI * 1) / cardNum;
    let radius: number;
    window.innerWidth > 600 ? (radius = 200) : (radius = 100);
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
          isForward: newState[index].isForward,
        };
        return newState;
      });
      setIsShuffled(true);
    });
  };

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
                  rotate(${(index - cardNum / 2) * (180 / cardNum)}deg)`,
                    transformOrigin: "50% 50%",
                  }
              : {}
          }
          clickHandler={clickCard}
        />
      )),
    [cards, isShuffling, isShuffled, cardNum]
  );

  const startShuffling = (type: number) => {
    setClicked(true);
    setType(type);
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

  useEffect(() => {
    if (pickedCard.length === 3) {
      props.setDto({
        type_num: type,
        first_card_num: pickedCard[0].num,
        first_forward: pickedCard[0].isForward,
        second_card_num: pickedCard[1].num,
        second_forward: pickedCard[1].isForward,
        third_card_num: pickedCard[2].num,
        third_forward: pickedCard[2].isForward,
      });
    }
  }, [pickedCard]);


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
