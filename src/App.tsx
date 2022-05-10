import React, { useState, useEffect } from "react";
import "./App.css";
import OsloOpera from "./images/OsloOpera.jpg";
import ReactCardFlip from "react-card-flip";
import client from "./client";

function App() {
  useEffect(() => {
    client
      .fetch(
        `*[_type == "flashcard"]{
      front,
      back,
      image{
        asset->{
          _id,
          url
        },
      },
     
    }`
      )
      .then((data) => console.log(data))
      .catch(console.error);
  }, []);

  const [isFlipped, setFlipped] = useState(false);

  function flipCard(event: React.MouseEvent<HTMLDivElement>) {
    setFlipped(!isFlipped);
  }

  return (
    <div className="App">
      <h1>World Capitals</h1>

      <ReactCardFlip isFlipped={isFlipped}>
        <div className="card" onClick={flipCard}>
          <img src={OsloOpera} alt="" />

          <div className="text">Norway</div>
        </div>
        <div className="card" onClick={flipCard}>
          <img src={OsloOpera} alt="" />
          <div className="text">Oslo</div>
        </div>
      </ReactCardFlip>

      <div>sound</div>
      <div className="answer-button">
        <button>
          <i className="fas fa-smile fa-5x"></i>
        </button>
        <button>
          <i className="fas fa-frown fa-5x"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
