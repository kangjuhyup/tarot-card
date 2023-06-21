import { useState } from "react";
import { useInterval } from "../../hooks/interval";
import useRoundStore from "../../store/round";

export interface ResultProps {
  success: boolean;
  result: string;
}

const ResultController = (props: ResultProps) => {
  const { success, result } = props;
  const { round } = useRoundStore();
  const [message, setMessage] = useState<string>("");
  const [count, setCount] = useState(0);
  useInterval(() => {
    if (count >= result.length) {
      return;
    }

    setMessage((prev) => {
      let newMessage: string = prev ? prev + result[count] : result[0];
      setCount((prev) => prev + 1);
      return newMessage;
    });
  }, 150);

  return {
    message,
    success,
    round
  };
};

export default ResultController;
