import React, { useState } from "react";
import "./App.css";
import OsloOpera from "./images/OsloOpera.jpg";

function App() {
  const [flipped, setFlipped] = useState(false);

  function flipCard(event: React.MouseEvent<HTMLDivElement>) {
    setFlipped(!flipped);
  }

  return (
    <div className="App">
      <h1>World Capitals</h1>

      <div className="scene scene--card">
        <div
          className={`card ${flipped ? "is-flipped" : ""}`}
          onClick={flipCard}
        >
          <div className="card__face card__face--front">
            <img src={OsloOpera} alt="" width="50" height="50" />
            <br />
            Norway
          </div>
          <div className="card__face card__face--back">Oslo</div>
        </div>
      </div>

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
