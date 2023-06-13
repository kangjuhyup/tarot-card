import { useEffect, useMemo, useState } from "react";

interface PickedCard {
  num: number;
  isForward: boolean;
}

interface Card {
  index: number;
  x: number;
  y: number;
  isPicked: boolean;
  isForward: boolean;
}

const cardNum: number = 78;

const CardDeckController = (props: { setDto: any }) => {
  const [type, setType] = useState<number>(0);
  const [cards, setCards] = useState<Card[]>(() =>
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

  return {
    cards,
    startShuffling,
    isShuffling,
    isShuffled,
    clickCard,
    isClicked,
  };
};

export default CardDeckController;
