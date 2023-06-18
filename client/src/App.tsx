import { useEffect, useState } from "react";
import "./App.css";
import useTarot from "./hooks/tarotHooks";
import { getResultDto } from "./hooks/dto/getResult.dto";
import CardDeck from "./pages/cardDeck";
import Loading from "./pages/loading";
import Result from "./pages/result";

interface Star {
  x: number;
  y: number;
  r: number;
}

const App = () => {
  const { getResult, loading, error } = useTarot();
  const [dto, setDto] = useState<getResultDto>();
  const [ tarot_result, setResult ] = useState({ success : false, result : ''});
  const [stars, setStars] = useState<Star[]>([
    {
      x: Math.random() * Math.max(window.innerWidth),
      y: Math.random() * Math.max(window.innerHeight),
      r: Math.random() * 0.7 + 0.6,
    },
  ]);
  useEffect(() => {
    console.log(process.env.REACT_APP_TAROT_SERVER)
    genStars();
  }, []);

  useEffect(() => {
    console.log('tarot_result : ',tarot_result)
  },[tarot_result])

  const setCards = async (value: getResultDto) => {
    const result = await getResult(value);
    console.log(result);
    if(result.success) setResult(result)
    else console.log('result fail')
  };

  

  const genStars = () => {
    const rndX = () => Math.random() * Math.max(window.innerWidth);
    const rndY = () => Math.random() * Math.max(window.innerHeight);
    const rndR = () => Math.random() * 0.7 + 0.6;
    const _size = 78;
    for (let i = 0; i < _size; i++) {
      setTimeout(() => {
        setStars((prev) => {
          const newState = [...prev];
          newState.push({ x: rndX(), y: rndY(), r: rndR() });
          return newState;
        });
      }, 1000);
    }
  };
  return (
    <div className="backSky">
      {!stars
        ? ``
        : stars.map((star, index) => {
            return (
              <svg key={index} className="sky">
                <circle key={index} cx={star.x} cy={star.y} r={star.r} className="star" />{" "}
              </svg>
            );
          })}

      <div className="App">
        <div className="topHalf">
          <CardDeck setDto={setCards} />
        </div>
        <div className="bottomHalf">
          <Result success={tarot_result.success} result={tarot_result.result}/>
        </div>
      </div>
      {loading ? <Loading/> : <></>}
    </div>
  );
};

export default App;
