import React from "react";
import "./App.css";
import OsloOpera from "./images/OsloOpera.jpg";

function App() {
  return (
    <div className="App">
      <h1>World Capitals</h1>
      <img src={OsloOpera} alt="" width="200" />
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
