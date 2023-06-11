import React, { useEffect, useState } from "react";
import "./App.css";
import CardDeck from "./pages/cardDeck";
import Result from "./pages/result";

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
    for(let i = 0; i<_size; i++) {
      setTimeout(() => {
        setStars((prev) => {
          const newState = [...prev];
          newState.push({ x: rndX(), y: rndX(), r: rndR() });
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
              <svg className="sky">
                <circle cx={star.x} cy={star.y} r={star.r} className="star" />{" "}
              </svg>
            );
          })}

      <div className="App">
        <div className="topHalf">
          <CardDeck />
        </div>
        <div className="bottomHalf">
          <Result />
        </div>
      </div>
    </div>
  );
};

export default App;
