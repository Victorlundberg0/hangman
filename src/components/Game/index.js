import React, { useEffect } from 'react';
import './style.css';
import ImageCounter from './ImageCounter';
import EndGame from './EndGame';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FadeLoader from "react-spinners/FadeLoader";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import KeyboardIcon from '@material-ui/icons/Keyboard';

function Game(props) {

  const { reloadData } = props;

  //variables.
  const [lives, setLives] = React.useState(6);
  const [emptyWord, setEmptyWord] = React.useState("");
  const [keypress, setKeypress] = React.useState("");
  const [wordData, setWordData] = React.useState(null);
  const [gameOver, setGameOver] = React.useState(false);
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [points, setPoints] = React.useState(100);
  const [games, setGames] = React.useState(1);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const [showKeyboard, setShowKeyboard] = React.useState(false);


  //onclick event to get another word after each game, and resetting everything.
  const newGame = () => {
    setGames(games + 1);
    setOpenPopUp(false);
    setGameOver(false);
    setKeypress("");
    setDisableButton(false);
    setShowHint(false);
    setPoints(100);
    setLives(6);
  }

  //fetch the current word.
  useEffect(() => {
    setShowSpinner(true);
    fetch('https://random-words-api.vercel.app/word')
      .then(response => response.json())
      .then(data => {
        if (!data[0].word) {
          //if the data loaded but without the word.
           setOpenPopUp(true);
           setMessage("Word cound not be loaded");
        } else {
          setWordData(data)
        }
      })
      .catch(() => {
          setOpenPopUp(true);
          setMessage("Word cound not be loaded");
      });
    setShowSpinner(false);
  }, [games]);

  //creating empty word with the length of the word replaced by _.
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
    }
  }, [wordData]);

  //handling keypress.
  const handleKeyPress = (event) => {
    if (wordData && !gameOver) {
      if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
        //make sure you don't loose points for the same letter twice;
        if (keypress.includes(event.key.toLowerCase())) {
          toast.info(<p>you already guessed <b>{event.key.toUpperCase()}</b></p>);
          return;
        }
        setKeypress(keypress + " " + event.key.toLowerCase());//saves pressed characters.
        let newLives = lives;
        //check if the pressed character is part of the word.
        let fillWord = emptyWord;
        for (let i = 0; i < wordData[0].word.length; i++) {
          if (wordData[0].word[i].toLowerCase() === event.key.toLowerCase()) {
            let index = i * 2;
            fillWord = fillWord.substring(0, index) + wordData[0].word[i] + fillWord.substring(index + 1, fillWord.length);
          }
        }
        //removes one life and points if wrong. 
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

  //add event listener on keypress to only trigger once per click.
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  //function to end the game at 0 points of finished word.
  const endGame = (won) => {
    setShowKeyboard(false);
    if (won) {
      setMessage("You Won");
      setOpenPopUp(true);
    } else {
      setPoints(0);
      setMessage("Game Over");
      setOpenPopUp(true);
    }
    setGameOver(true);
    //fetch new data from localstorage in app component.
    setTimeout(() => { reloadData() }, 1000);
  }

  //player can buy one hint per word and loose points.
  const handleHint = () => {
    setPoints(points - 20);
    setDisableButton(true);
    setShowHint(true);
  }
  //Virtual keyboard layout
  const keyboardLayout = {
    'default': [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      'z x c v b n m exit',
    ],
  }
  //on click event for virtual keyboard
  const virtualInput = (button) => {
    if (button === "exit") {
      setShowKeyboard(false);
    } else {
      handleKeyPress({
        key: button,
        keyCode: button.charCodeAt(0)
      })
    }
  }

  return (
    <div id="game">
      <div id="transition"></div>
      <h3 id="mini-header" className="titles">Guess the word using your keyboard</h3>
      <h1 id="empty-word" className="titles">{emptyWord}</h1>
      <p id="keypress" className="titles">you guessed on these characters: {keypress}</p>
      {showHint && <p id="hint" className="titles">Hint: {wordData ? wordData[0].definition : ""}</p>}
      <ImageCounter lives={lives}></ImageCounter>
      <p className="titles" id="points">Current points: {points}</p>
      <div id="hint-button"><Button variant="contained" disabled={disableButton} onClick={handleHint}>Buy Hint for 20 Points</Button></div>
      {openPopUp && <EndGame score={points} message={message} word={wordData[0].word} nextGame={newGame}></EndGame>}
      <ToastContainer />
      {showKeyboard && <div id="virtual-keyboard"><Keyboard layout={keyboardLayout} onKeyPress={virtualInput} ></Keyboard></div>}
      <div id="keyboard-button"> <Button variant="contained" onClick={() => setShowKeyboard(true)}><KeyboardIcon></KeyboardIcon></Button></div>
      {showSpinner &&
        <div id="spinner">
          <FadeLoader></FadeLoader>
          <p>Loading New Word</p>
        </div>}
    </div>

  );
}

export default Game;
