import { useEffect, useState } from "react";
import { Cardprops } from "../card";

const CardController = ({
  isForward,
  clickHandler,
}: Cardprops) => {
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

  return {
    zIdx,
    clickCard,
    background,
  };
};

export default CardController;
