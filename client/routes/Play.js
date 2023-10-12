import React from 'react';
import MainContainer from '../containers/MainContainer.jsx';
import LeftSideContainer from '../containers/LeftSideContainer.jsx';
import RightSideContainer from '../containers/RightSideContainer.jsx';

import { setScore } from '../redux/gameSlice';

// props coming from App.js
const Play = ({
  currentUser,
  score,
  hardmode,
  setHardmode,
  pokemon,
  setPokemon,
  setHighScore,
}) => {
  return (
    <div id='app'>
      <LeftSideContainer
        currentUser={currentUser}
        score={score}
        pokemon={pokemon}
        setHighScore={setHighScore}
      />
      <MainContainer
        pokemon={pokemon}
        setPokemon={setPokemon}
        score={score}
        setScore={setScore}
        hardmode={hardmode}
        setHardmode={setHardmode}
      />
      <RightSideContainer
        pokemon={pokemon}
        hardmode={hardmode}
        setHardmode={setHardmode}
      />
    </div>
  );
};

export default Play;
