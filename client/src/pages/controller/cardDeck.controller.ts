import { useEffect, useMemo, useState } from "react";
import useRoundStore from "../../store/round";

interface PickedCard {
  num: number;
  isForward: boolean;
  x: number;
  y: number;
}

interface Card {
  index: number;
  x: number;
  y: number;
  isPicked: boolean;
  pickNum? : number;
  isForward: boolean;
}


const cardNum: number = 78;
const angleIncrement = (Math.PI * 1) / cardNum;

const CardDeckController = (props: { setDto: any }) => {
  const {setRound} = useRoundStore();
  const [isRun,setIsRun] = useState<boolean>(false);
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
        newState[num].pickNum = pickedCard.length
        return newState;
      });
      setPickedCard([
        ...pickedCard,
        { num: num, isForward: cards[num].isForward, x: cards[num].x, y: cards[num].y },
      ]);
      return { isClicked: true, isForward: false };
    }
    return { isClicked: false, isForward: false };
  };

  const setShowCards = () => {
    let radius: number;
    window.innerWidth > 600 ? (radius = 200) : (radius = 100);

    cards.forEach((_, index) => {
      const angle = index * angleIncrement;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      setTimeout(() => {
        setIsShuffling((prevState) => {
          const newState = [...prevState];
          newState[index] = false;
          return newState;
        });
      }, index * 100);

      setCards((prevState) => {
        const newState = [...prevState];
        newState[index].x = x;
        newState[index].y = y;
        return newState;
      });
      setIsShuffled(true);
      setRound(1);
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
     
      setTimeout(() => {
        setIsRun(true);
      },500);
      setRound(2);
    }
  }, [pickedCard]);

  return {
    cards,
    startShuffling,
    isShuffling,
    isShuffled,
    clickCard,
    isClicked,
    isRun,
  };
};

export default CardDeckController;
