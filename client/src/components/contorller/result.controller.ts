import { useEffect, useState } from "react";
import { useInterval } from "../../hooks/interval";

export interface ResultProps {
  message:string
}

const ResultController = (props: ResultProps) => {
  const { message } = props;
  const [result, setResult] = useState<string>("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if(message!==result) {
      setResult('');
      setCount(0);
    }
  },[message]);

  useInterval(() => {
    if (count >= message.length) {
      return;
    }
    setResult((prev) => {
      let newMessage: string = prev ? prev + message[count] : message[0];
      setCount((prev) => prev + 1);
      return newMessage;
    });
  }, 50);

  return {
    result,
  };
};

export default ResultController;
