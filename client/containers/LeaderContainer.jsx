import React from 'react';
import Leader from '../components/Leader.jsx';

const LeaderContainer = ({ leadersList }) => {
  const leaders = [];

  if (leadersList) {
    for (let i = 0; i < leadersList.length; i++) {
      leaders.push(
        <Leader
          rank={i + 1}
          username={leadersList[i].username}
          highScore={leadersList[i].highScore}
          key={`leader-${i}`}
        />
      );
    }
  }

  return (
    <div className='leaderContainer'>
      <table>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Username</th>
            <th>High Score</th>
          </tr>
        </thead>
        <tbody>{leaders}</tbody>
      </table>
    </div>
  );
};

export default LeaderContainer;
