import React, { useState, useEffect } from "react";
import "./App.css";
import ReactCardFlip from "react-card-flip";
import client from "./client";
import useDelayedState from "./use-delayed-state";
import { getLastAnswer, saveAnswer } from "./storage";
import { FinishedReview } from "./FinishedReview";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import { Session } from "@supabase/supabase-js";
import { promises } from "stream";

type Card = {
  _id: string;
  front: string;
  back: string;
  image?: { asset: { url: string } };
};

// next step; 1. change storage to database 2. make it prettier and responsive

function App() {
  const [isFlipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState<Card[]>([]);
  const [cardIndex, setCardIndex] = useDelayedState(0);

  const [session, setSession] = useState<Session | null>(null);

  const [counter, setCounter] = useState({
    right: 0,
    wrong: 0,
    review: 0,
  });

  const [lastSavedId, setlastSavedId] = useState("");
  const [lastReviewStart, setLastReviewStart] = useState(new Date());

  const initialise = () => {
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
        setDeck(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    initialise();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    setCounter((c) => ({ ...c, review: deck.length }));
  }, [deck]);

  function reset() {
    setCounter({
      right: 0,
      wrong: 0,
      review: deck.length,
    });

    initialise();
  }

  async function retry() {
    debugger;
    const lastAnswers = await Promise.all(
      deck.map((card) => getLastAnswer(card._id))
    );

    const wrong = deck.filter((card) => {
      const lastAns = lastAnswers.find((ans) => ans.id === card._id);

      return (
        lastAns?.correct === false && new Date(lastAns.time) > lastReviewStart
      );
    });

    setCounter({
      right: 0,
      wrong: 0,
      review: wrong.length,
    });
    setCardIndex(0); // delayed state
    setDeck(wrong);
    setLastReviewStart(new Date());
  }

  function stopReviewing() {
    setCounter({ ...counter, review: 0 });
  }

  function flipCard(event: React.MouseEvent<HTMLDivElement>) {
    setFlipped(!isFlipped);
  }

  async function showNextCard(
    event: React.MouseEvent<HTMLButtonElement>,
    correct: boolean
  ) {
    setFlipped(false);
    let newCardIndex = (cardIndex + 1) % deck.length;

    let cardId = deck[cardIndex]._id;

    if (session) {
      await saveAnswer(cardId, correct, session);
    }
    setlastSavedId(cardId);

    setCardIndex(newCardIndex, 200);
    // send answer til storage
    // get id, set correct, set time - push to object "deckState"

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
      <FinishedReview
        right={counter.right}
        wrong={counter.wrong}
        reset={reset}
        retry={retry}
      />
    );
  }

  const image =
    deck[cardIndex].image === undefined ? null : (
      <img src={deck[cardIndex].image?.asset.url} alt="" />
    );

  return (
    <div>
      {!session ? (
        <Auth />
      ) : (
        <div className="App">
          <Account session={session} />
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
          <div className="answer-buttons">
            <button
              className="answer-button-right"
              onClick={(event) => {
                let cardId = deck[cardIndex]._id;
                if (cardId !== lastSavedId) {
                  showNextCard(event, true);
                } else {
                }
              }}
            >
              <i className="fas fa-smile fa-5x"></i>
            </button>

            <button
              className="answer-button-wrong"
              onClick={(event) => {
                let cardId = deck[cardIndex]._id;
                if (cardId !== lastSavedId) {
                  showNextCard(event, false);
                }
              }}
            >
              <i className="fas fa-frown fa-5x"></i>
            </button>
          </div>
          <h3>
            Right: {counter.right} Wrong: {counter.wrong}
          </h3>
          <button onClick={stopReviewing}>I want out!</button>
        </div>
      )}
    </div>
  );
}

export default App;
