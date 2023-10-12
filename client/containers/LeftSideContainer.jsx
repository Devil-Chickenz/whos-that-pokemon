import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setScore } from '../redux/gameSlice';
import { setUser, setHighScore } from '../redux/userSlice';

/*

/////// LEFT SIDE CONTAINER \\\\\\\
Displays high score and current score (which User Input resets to 0 upon failing to name a pokemon).
- for stretch feature: ths would also hold user information (i.e. username)
- Inherits score and pokemon from App

*/

// props coming from play.js
const LeftSideContainer = (props) => {
  const score = useSelector((state) => state.game.score);
  const pokemon = useSelector((state) => state.game.pokemon);
  const currentUser = useSelector((state) => state.user);
  const lives = useSelector((state) => state.game.lives);

  //This condition hides the score if no pokemon has been fetched.
  if (!pokemon.imageURL) {
    return <div id='LeftSideContainer' data-testid='leftContainer'></div>;
  }

  return (
    <div id='LeftSideContainer' className='left-side-container'>
      <h2 className='lives'>Lives: {lives}</h2>
      <h2 className='score' data-testid='score'>
        Your Score: {score}
      </h2>
      <h2 className='score' data-testid='highscore'>
        High Score: {currentUser.highScore}
      </h2>
    </div>
  );
};

export default LeftSideContainer;
