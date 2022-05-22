import React, { useState, useEffect } from "react";
import "./App.css";
import OsloOpera from "./images/OsloOpera.jpg";
import ReactCardFlip from "react-card-flip";
import client from "./client";
import useDelayedState from "./use-delayed-state";

type Card = {
  front: string;
  back: string;
  image?: { asset: { url: string } };
};

function App() {
  const [isFlipped, setFlipped] = useState(false);
  const [cardInfo, setCardInfo] = useState<Card[]>([]);
  const [cardIndex, setCardIndex] = useDelayedState(0);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "flashcard"]{
      front,
      back,
      image{
        asset->{
          url
        },
      },
     
    }`
      )
      .then((data) => {
        console.log(data);
        setCardInfo(data);
      })
      .catch(console.error);
  }, []);

  function flipCard(event: React.MouseEvent<HTMLDivElement>) {
    setFlipped(!isFlipped);
  }

  function showNextCard(event: React.MouseEvent<HTMLButtonElement>) {
    setFlipped(false);
    let newCardIndex = (cardIndex + 1) % cardInfo.length;

    setCardIndex(newCardIndex, 200);
  }

  if (cardInfo.length === 0) {
    return <div>loading...</div>;
  }

  const image =
    cardInfo[cardIndex].image === undefined ? null : (
      <img src={cardInfo[cardIndex].image?.asset.url} alt="" />
    );

  return (
    <div className="App">
      <h1>World Capitals</h1>

      <ReactCardFlip isFlipped={isFlipped}>
        <div className="card" onClick={flipCard}>
          {image}

          <div className="text">{cardInfo[cardIndex].front}</div>
        </div>
        <div className="card" onClick={flipCard}>
          {image}

          <div className="text">{cardInfo[cardIndex].back}</div>
        </div>
      </ReactCardFlip>

      <div>sound</div>
      <div className="answer-button">
        <button className="answer-button-right" onClick={showNextCard}>
          <i className="fas fa-smile fa-5x"></i>
        </button>
        <button className="answer-button-wrong" onClick={showNextCard}>
          <i className="fas fa-frown fa-5x"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
