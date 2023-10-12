import React from 'react';

const Leader = ({ rank, username, highScore }) => {
  return (
    <tr className='leader'>
      <td>{rank}</td>
      <td>{username}</td>
      <td>{highScore}</td>
    </tr>
  );
};

export default Leader;
