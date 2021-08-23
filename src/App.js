import './App.css';
import Game from './components/Game';
import Menu from './components/menu';
import React, { useEffect } from 'react';

function App() {
  const [gameStarted, setGameStarted] = React.useState(false);
  //playerdata variables.
  const [total, setTotal] = React.useState(0);
  const [times, setTimes] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);

  //transitions between the menu and the game when player clicks start.
  const startGame = (event) => {
    setTimeout(() => { setGameStarted(event) }, 1600);
  }
  //load previous games from localstorage on load.
  useEffect(() => {
    loadData();
  }, []);

  //load previous games from localstorage
  const loadData = () => {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setTotal(userData.total);
      setHighScore(userData.highScore);
      setTimes(userData.times);
    }
  }

  return (
    <div className="App">
      <div id="saved">
        <p>Total points: {total}</p>
        <p>Times played: {times}</p>
        <p>highScore: {highScore}</p>
      </div>
      {!gameStarted && <Menu startGame={startGame}></Menu>}
      {gameStarted && <Game reloadData={loadData}></Game>}
    </div>
  );
}

export default App;
