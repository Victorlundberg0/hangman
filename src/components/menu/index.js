import React from 'react';
import Button from '@material-ui/core/Button';
import HangManImage from '../../images/0.png';
import './style.css';

function Menu(props) {
  const { startGame } = props;

  const [playTransition, setPlayTransition] = React.useState(false);

  const handleClick = () => {
    setPlayTransition(true);
    startGame(true);
  }

  return (
    <div id="menu">
      {playTransition ? <div id="transitions"></div> :""}
      <h1 id="title" className="titles">HANGMAN</h1>
      <img id="hang-man-image" src={HangManImage} alt="hangman" />
      <Button onClick={handleClick} className="titles" id="start" variant="contained">Play</Button>
    </div>
  );
}

export default Menu;
