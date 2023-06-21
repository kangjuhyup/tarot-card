import { useState } from "react";
import { getResultDto } from "../hooks/dto/getResult.dto";
import useTarot from "../hooks/tarotHooks";
import CardDeck from "../components/cardDeck";
import Result from "../components/result";
import Loading from "./loading";
import TarotCardController from "./controller/tarotCard.controller";

const TarotCardPage = () => {
    const { result, resultLoading, resultError, setCards} = TarotCardController();

  return (
    <div>
      <div className="topHalf">
        <CardDeck setDto={setCards} />
      </div>
      <div className="bottomHalf">
        <Result success={result.success} result={result.result} />
      </div>
      {resultLoading ? <Loading /> : <></>}
    </div>

  );
};

export default TarotCardPage;
