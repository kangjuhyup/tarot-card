import { useEffect, useState } from "react";
import { getResultDto } from "../hooks/dto/getResult.dto";
import useTarot from "../hooks/tarotHooks";
import CardDeck from "../components/cardDeck";
import Result from "../components/result";
import Loading from "./loading";
import TarotCardController from "./controller/tarotCard.controller";
import useKakao from "../hooks/useKakao";

const TarotCardPage = () => {
  const { message, setMessage, resultLoading, resultError, setCards ,uuid } =
    TarotCardController();
  const { share } = useKakao();


  return (
    <>
      <div className="topHalf">
        <CardDeck setDto={setCards} setMessage={setMessage} />
      </div>
      <div className="bottomHalf">
        <Result message={message} />
        {uuid ? (
          <>
            <button
              style={{
                position: "absolute",
                zIndex: "100000",
                borderRadius: "12px",
                width: "100px",
                height: "50px",
                background: "yellow",
                border: "none",
                bottom: "20px",
              }}
              onClick={() => share(uuid)}
            >
              공유하기
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      {resultLoading ? <Loading /> : <></>}
    </>
  );
};

export default TarotCardPage;
