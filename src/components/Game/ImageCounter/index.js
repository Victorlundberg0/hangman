import React, { useEffect } from 'react';
import image0 from '../../../images/0.png';
import image1 from '../../../images/1.png';
import image2 from '../../../images/2.png';
import image3 from '../../../images/3.png';
import image4 from '../../../images/4.png';
import image5 from '../../../images/5.png';
import image6 from '../../../images/6.png';
import './style.css';
function ImageCounter(props) {
    let imageList = [image0,image1,image2,image3,image4,image5,image6];
    const [lives, setLives] = React.useState(6);
    useEffect(() => {
      setLives(props.lives);
      }, [props.lives]);
    return (
        <div id="image-counter">
            <img id="images" src={imageList[lives]} alt="hangman" />
        </div>
    );
}

export default ImageCounter;
