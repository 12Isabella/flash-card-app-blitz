import React, { useState } from "react";
import "./App.css";
import OsloOpera from "./images/OsloOpera.jpg";
import ReactCardFlip from "react-card-flip";

function App() {
  const [isFlipped, setFlipped] = useState(false);

  function flipCard(event: React.MouseEvent<HTMLButtonElement>) {
    setFlipped(!isFlipped);
  }

  return (
    <div className="App">
      <h1>World Capitals</h1>
      <img src={OsloOpera} alt="" width="200" />
      <ReactCardFlip isFlipped={isFlipped}>
        <button onClick={flipCard}>Hey</button>
        <button onClick={flipCard}>Hello</button>
      </ReactCardFlip>
      <div>Norway</div>
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
