import './style.css';

function Game() {
  let counter = 7;
    return (
      <div id="game">
        <h3 id="mini-header" className="titles">Guess the word:</h3>
        <h1 id="word" className="titles">_ _ _ _ _</h1>
      </div>
    );
  }
  
  export default Game;
  