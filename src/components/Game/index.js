import React, { useEffect } from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import ImageCounter from './ImageCounter';
import EndGame from './EndGame';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Game() {
  //variables.
  const [lives, setLives] = React.useState(6);
  const [emptyWord, setEmptyWord] = React.useState("");
  const [keypress, setKeypress] = React.useState("");
  const [wordData, setWordData] = React.useState(null);
  const [gameOver, setGameOver] = React.useState(false);
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [points, setPoints] = React.useState(100);

  //fetch the current word.
  useEffect(() => {
    fetch('https://random-words-api.vercel.app/word')
      .then(response => response.json())
      .then(data => {
        if (!data[0].word) {
          setWordData([{
            word: "test",
            definition: "test",
          }])
        } else {
          setWordData(data)
        }
      })

  }, []);
  //setting empty word.
  useEffect(() => {
    if (wordData && wordData[0].word) {
      //replaces all diatrics from characters, ie è becomes e.
      let newData = wordData;
      newData[0].word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      setWordData(newData);
      let newWord = "";
      while (newWord.length < wordData[0].word.length * 2) {
        newWord = newWord + "_ ";
      }
      setEmptyWord(newWord);
      console.log(wordData[0].word);
    }
  }, [wordData]);
  //handling keypress.
  const handleKeyPress = (event) => {
    if (wordData && !gameOver) {
      if ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)) {
        //make sure you don't loose points for the same letter twice;
        if (keypress.includes(event.key.toLowerCase())) {
          toast.info(<p>you already guessed <b>{event.key.toUpperCase()}</b> &#128516;</p>);
          return;
        }
        setKeypress(keypress + " " + event.key.toLowerCase());
        let newLives = lives;
        //check if the pressed character is part of the word.
        let fillWord = emptyWord;
        for (let i = 0; i < wordData[0].word.length; i++) {
          if (wordData[0].word[i].toLowerCase() === event.key.toLowerCase()) {
            let index = i * 2;
            fillWord = fillWord.substring(0, index) + wordData[0].word[i] + fillWord.substring(index + 1, fillWord.length);
          }
        }
        if (!wordData[0].word.toLowerCase().includes(event.key.toLowerCase())) {
          newLives = lives - 1;
          setPoints(points - 10);
          setLives(newLives);
        }
        setEmptyWord(fillWord);
        //end game if score is lost.
        if (newLives === 0) {
          endGame(false);
        }
        //end game is word is completed.
        if (!fillWord.includes("_")) {
          endGame(true);
        }
      }
    }
  }
  //function to end the game at 0 points.
  const endGame = (won) => {
    if (won) {
      setMessage("You Won");
      setOpenPopUp(true);
    } else {
      setPoints(0);
      setMessage("Game Over");
      setOpenPopUp(true);
    }
    setGameOver(true);
  }

  return (
    <div id="game">
      <div id="transition"></div>
      <h3 id="mini-header" className="titles">Guess the word using your keyboard</h3>
      <h1 id="empty-word" className="titles">{emptyWord}</h1>
      <p id="keypress" className="titles">you guessed on these characters: {keypress}</p>
      <p id="hint" className="titles">Hint: {wordData ? wordData[0].definition : ""}</p>
      <div id="input-field"><TextField autoFocus onKeyPress={handleKeyPress} /></div>
      <ImageCounter lives={lives}></ImageCounter>
      <p className="titles" id="points">Current points: {points}</p>
      {openPopUp ? <EndGame score={points} message={message}></EndGame> : ""}
      <ToastContainer />
    </div>
  );
}

export default Game;
