import { CardWrapper } from "../components/card";
import Result from "../components/result";
import SharedResultController from "./controller/sharedResult.controller";
import Loading from "./loading";

const SharedResultPage = () => {
  const { sharedResult, sharedCards,move } = SharedResultController();
  console.log(sharedCards);
  return (
    <>
      <div className="topHalf">
        {sharedCards &&
          sharedCards.map((card: any, idx:number) => (
            <CardWrapper
              style={{
                backgroundImage: card.forward
                  ? `url(/images/tarot/${card.num}.jpeg)`
                  : `url(/images/tarot/tarot180/${card.num}.jpeg)`,
                  transform: `
                  translate(${(idx - 1) * 110}px)
                  `
              }}
            />
          ))}
      </div>
      <div className="bottomHalf">
        {!sharedResult ? <Loading /> : <Result message={sharedResult} />}
        <button style={{zIndex:"100000"}} onClick={move}>타로점 보러가기</button>
      </div>
    </>
  );
};
export default SharedResultPage;
