import React, { useState, useEffect } from "react";
import "./App.css";
import ReactCardFlip from "react-card-flip";
import client from "./client";
import useDelayedState from "./use-delayed-state";
import { saveAnswer } from "./storage";

type Card = {
  _id: string;
  front: string;
  back: string;
  image?: { asset: { url: string } };
};

// next step; 1. What do we do with the words that were correct/incorrect? 2. make it prettier and responsive

// Note after going through all cards and/or on Click "stop reviewing" ("You knew 5 out of 10 cards. Do you want to review the ones you didn't know?")

function App() {
  const [isFlipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState<Card[]>([]);
  const [cardIndex, setCardIndex] = useDelayedState(0);

  const [counter, setCounter] = useState({
    right: 0,
    wrong: 0,
    review: 0,
  });

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
  useEffect(() => {
    setCounter((c) => ({ ...c, review: deck.length }));
  }, [deck]);

  function flipCard(event: React.MouseEvent<HTMLDivElement>) {
    setFlipped(!isFlipped);
  }

  function showNextCard(
    event: React.MouseEvent<HTMLButtonElement>,
    correct: boolean
  ) {
    setFlipped(false);
    let newCardIndex = (cardIndex + 1) % deck.length;

    setCardIndex(newCardIndex, 200);
    // send answer til storage
    // get id, set correct, set time - push to object "deckState"

    let cardId = deck[cardIndex]._id;

    saveAnswer(cardId, correct);

    if (correct === true) {
      setCounter({
        ...counter,
        right: counter.right + 1,
        review: counter.review - 1,
      });
    } else {
      setCounter({
        ...counter,
        wrong: counter.wrong + 1,
        review: counter.review - 1,
      });
    }
  }

  if (deck.length === 0) {
    return <div>loading...</div>;
  }

  if (counter.review === 0) {
    return (
      <div>
        You answered {counter.right} out of {deck.length} cards correctly.{" "}
      </div>
    );
  }

  const image =
    deck[cardIndex].image === undefined ? null : (
      <img src={deck[cardIndex].image?.asset.url} alt="" />
    );

  return (
    <div className="App">
      <h1>World Capitals</h1>
      <h2>Deck contains {deck.length} cards</h2>
      <h3>{counter.review} cards left to review</h3>

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
        <button
          className="answer-button-right"
          onClick={(event) => showNextCard(event, true)}
        >
          <i className="fas fa-smile fa-5x"></i>
        </button>

        <button
          className="answer-button-wrong"
          onClick={(event) => showNextCard(event, false)}
        >
          <i className="fas fa-frown fa-5x"></i>
        </button>
        <h3>
          Right: {counter.right} Wrong: {counter.wrong}
        </h3>
      </div>
    </div>
  );
}

export default App;
