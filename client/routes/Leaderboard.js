import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeaderContainer from '../containers/LeaderContainer.jsx';
import { setScore, setLives, setResult } from '../redux/gameSlice';
import { useSelector, useDispatch } from 'react-redux';

const Leaderboard = () => {
  const score = useSelector((state) => state.game.score);
  const currentScore = JSON.stringify(score);
  const currentUser = useSelector((state) => state.user);
  const [leadersList, setLeadersList] = useState([]);

  //fetch request to get top users (to /pokemon/leaderboard)
  const getLeaderboard = async () => {
    const response = await fetch('/pokemon/leaderboard');
    const leaders = await response.json();
    setLeadersList(leaders);
  };

  let DBScore;
  const getDBScore = async () => {
    let response = await fetch(`/pokemon/leaderboard/${currentUser.username}`);
    response = await response.json();
    DBScore = response.highScore;
    updateDBScore();
  };

  const updateDBScore = async () => {
    //if score > currentUser.highScore
    //post request to update user's high score (to /pokemon/leaderboard/:username)
    if (score > DBScore) {
      const body = JSON.stringify({ highScore: score });
      const response = await fetch(
        `/pokemon/leaderboard/${currentUser.username}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body,
        }
      );
    }
  };

  //use effect to load in leaderboard and user high score, and update user high score
  useEffect(() => {
    getLeaderboard();
    getDBScore();
  }, []);

  // when routed to leaderboard, reset score lives, and result to initial state
  const dispatch = useDispatch();
  dispatch(setScore(0));
  dispatch(setLives(3));
  dispatch(setResult(''));

  return (
    <div className='leaderboard-main'>
      <div className='scores'>
        <div className='user-current-score'>
          <h3>Your Score</h3>
          <h3 id='current-user-current-score'>{currentScore}</h3>
        </div>
        <div className='user-high-score'>
          <h3>Your High Score</h3>
          <h3 id='current-user-high-score'>{currentUser.highScore}</h3>
        </div>
      </div>
      <Link to='/play'>
        <button className='play-again'>Play Again</button>
      </Link>
      <div className='leaderboard'>
        <h3>Leaderboard</h3>
        <LeaderContainer leadersList={leadersList} />
      </div>
    </div>
  );
};

export default Leaderboard;
