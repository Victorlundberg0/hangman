import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import './style.css';

function EndGame(props) {

  // onclick event to get another word.
  const { nextGame } = props;

  //saving the score to localstorage.
  useEffect(() => {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const total = parseInt(userData.total) + props.score;
      const times = parseInt(userData.times) + 1;
      let highScore = parseInt(userData.highScore);
      if (props.score > highScore) {
        highScore = props.score;
      }
      const newData = {
        total,
        times,
        highScore,
      }
      localStorage.setItem('userData', JSON.stringify(newData));
    } else {
      const total = props.score;
      const times = 1;
      const highScore = props.score;
      const newData = {
        total,
        times,
        highScore,
      }
      localStorage.setItem('userData', JSON.stringify(newData));
    }
  }, [props.score]);

  return (
    <div id="end-game">
      <div id="back-ground"></div>
      <div id="message-div">
        <h2 className="titles" id="message">{props.message}</h2>
        <p className="titles" id="score">Score: {props.score}</p>
        <Button className="titles" id="next" variant="contained" onClick={nextGame}>Next Word</Button>
      </div>
    </div>
  );
}

export default EndGame;
