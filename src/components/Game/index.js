import React from 'react';
import './style.css';

function Game() {
  const [lives, setLives] = React.useState(7);
    return (
      <div id="game">
        <h3 id="mini-header" className="titles">Guess the word:</h3>
        <h1 id="word" className="titles">_ _ _ _ _</h1>
        <p>{lives}</p>
      </div>
    );
  }
  
  export default Game;
  