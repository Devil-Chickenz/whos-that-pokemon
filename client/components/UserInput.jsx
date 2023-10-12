import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setScore, setPokemon, setLives, setResult } from '../redux/gameSlice';
import { setHighScore } from '../redux/userSlice';
import { Navigate } from 'react-router-dom';

const UserInput = ({ getNewPokemon }) => {
  const dispatch = useDispatch();

  // access state from store
  const score = useSelector((state) => state.game.score);
  const pokemon = useSelector((state) => state.game.pokemon);
  const lives = useSelector((state) => state.game.lives);
  const highScore = useSelector((state) => state.user.highScore);
  const result = useSelector((state) => state.game.result);
  // upon user submission, checks to see if submitted answer is correct
  // if correct it will alert and increment score
  // if incorrect it will alert with correct answer
  // will render new pokemon either way by calling getNewPokemon
  // Function to check the user's answer
  const checkAnswer = async (e) => {
    e.preventDefault();
    const answer = e.target[0].value;

    if (answer.toLowerCase() === pokemon.name) {
      const newScore = score + 1;
      dispatch(setResult('Correct'));
      // Increment the score and set it in the store
      dispatch(setScore(newScore));
      // check and set high score in state if needed
      if (newScore > highScore) {
        dispatch(setHighScore(newScore));
      }
      // get new pokemon and set in state
      getNewPokemon();
      //clear input field
      e.target.reset();
    } else {
      dispatch(setLives(lives - 1));
      dispatch(setResult('Wrong, you got it wrong'));
      // get new pokemon and set in state
      getNewPokemon();
      e.target.reset();
    }
  };
  // When lives reaches zero, game over go to leaderboard round
  if (lives === 0) {
    return <Navigate replace to='/leaderboard' />;
  }
  // Only display the user submission form if a Pokemon image is on the screen
  if (!pokemon.imageURL) {
    return <div id='startPageNoInput'></div>;
  }

  let hint;
  if (pokemon.types) {
    hint = pokemon.types.join(', ');
  }

  // Add the form for user submission when a Pokemon image renders
  return (
    <div>
      <form id='UserInput' onSubmit={checkAnswer}>
        <label htmlFor='userAnswer'> </label>
        <input
          id='userInputBox'
          type='text'
          placeholder='Type your answer here'
        />
        <input id='submitButton' type='submit' value='Submit' />
      </form>
      <br></br>
      <div id='result'>{result}</div>
      <br></br>
      <div id='hint'>Hint: {hint}</div>
    </div>
  );
};

export default UserInput;
