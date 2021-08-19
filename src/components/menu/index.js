import Button from '@material-ui/core/Button';
import HangManImage from '../../images/hangman.png';
import './style.css';

function Menu() {
    return (
      <div id="menu">
      <h1 id="title" className="titles">HANGMAN</h1>
      <img id="hang-man-image" src={HangManImage} alt="hangman"/>
       <Button className="titles" id="start" variant="contained">Play</Button>
      </div>
    );
  }
  
  export default Menu;
  