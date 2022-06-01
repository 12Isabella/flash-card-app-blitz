import React, { useState, useEffect } from "react";
import "./App.css";
import ReactCardFlip from "react-card-flip";
import client from "./client";
import useDelayedState from "./use-delayed-state";

type Card = {
  _id: string;
  front: string;
  back: string;
  image?: { asset: { url: string } };
};

function App() {
  const [isFlipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState<Card[]>([]);
  const [cardIndex, setCardIndex] = useDelayedState(0);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "flashcard"]{
      _id,
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
        setDeck(data);
      })
      .catch(console.error);
  }, []);

  function flipCard(event: React.MouseEvent<HTMLDivElement>) {
    setFlipped(!isFlipped);
  }

  function showNextCard(event: React.MouseEvent<HTMLButtonElement>) {
    setFlipped(false);
    let newCardIndex = (cardIndex + 1) % deck.length;

    setCardIndex(newCardIndex, 200);
    // get id, set correct, set time - push to object "deckState"

    let deckStateId = deck[cardIndex]._id;
    console.log(deckStateId);
  }

  if (deck.length === 0) {
    return <div>loading...</div>;
  }

  const image =
    deck[cardIndex].image === undefined ? null : (
      <img src={deck[cardIndex].image?.asset.url} alt="" />
    );

  return (
    <div className="App">
      <h1>World Capitals</h1>

      <ReactCardFlip isFlipped={isFlipped}>
        <div className="card" onClick={flipCard}>
          {image}

          <div className="text">{deck[cardIndex].front}</div>
        </div>
        <div className="card" onClick={flipCard}>
          {image}

          <div className="text">{deck[cardIndex].back}</div>
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
