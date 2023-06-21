import { useEffect, useState } from "react";
import "./App.css";
import { getResultDto } from "./hooks/dto/getResult.dto";
import CardDeck from "./components/cardDeck";
import Loading from "./pages/loading";
import Result from "./components/result";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TarotCardPage from "./pages/tarotCard";
import SharedResultPage from "./pages/sharedResult";

interface Star {
  x: number;
  y: number;
  r: number;
}

const App = () => {
  const [stars, setStars] = useState<Star[]>([
    {
      x: Math.random() * Math.max(window.innerWidth),
      y: Math.random() * Math.max(window.innerHeight),
      r: Math.random() * 0.7 + 0.6,
    },
  ]);
  useEffect(() => {
    genStars();
  }, []);



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
                <circle
                  key={index}
                  cx={star.x}
                  cy={star.y}
                  r={star.r}
                  className="star"
                />{" "}
              </svg>
            );
          })}

      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <TarotCardPage/>
              }
            />
            <Route path="/shared" element={
              <SharedResultPage/>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
