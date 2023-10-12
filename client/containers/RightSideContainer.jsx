import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGenChoice, setHardmode } from '../redux/gameSlice';
/*

/////// RIGHT SIDE CONTAINER \\\\\\\
Holds our Game Options:
- Inherits pokemon and hardmode state and setter functions from App
- This space was mostly reserved for our stretch features:
  - Timer
  - Filters for which type of pokemon get generated:
    - by generation (e.g. numbers 1-150)
    - by type (e.g. Fire)
  - Ad space

*/

const RightSideContainer = () => {
  const dispatch = useDispatch();

  // access state from store
  const hardmode = useSelector((state) => state.game.hardmode);
  const pokemon = useSelector((state) => state.game.pokemon);
  const genChoice = useSelector((state) => state.game.genChoice);

  //This functionality changes the state of Hardmode.
  const toggleHardmode = () => {
    // Dispatch the setHardmode action to update store
    dispatch(setHardmode(!hardmode));
  };

  // This functionality changes the state of genChoice based on value of select dropdown changing
  const changeGenChoice = (e) => {
    dispatch(setGenChoice(e.target.value));
  };

  // This condition hides the options until a pokemon is fetched.
  // if (!pokemon.imageURL) {
  //   return <div id='RightSideContainer' data-testid='rightContainer'></div>;
  // }

  return (
    <div id='RightSideContainer'>
      <div id='HardmodeButton' onChange={toggleHardmode}>
        <input
          type='checkbox'
          checked={hardmode === true}
          onChange={toggleHardmode}
        />
        Hard Mode
      </div>
      <label>Choose a Pokemon Game:</label>
      <select
        name='genChoice'
        id='generation'
        value={genChoice}
        onChange={changeGenChoice}
      >
        <option value='all'>All</option>
        <option value='red'>Red</option>
        <option value='blue'>Blue</option>
        <option value='yellow'>Yellow</option>
        <option value='gold'>Gold</option>
        <option value='silver'>Silver</option>
        <option value='crystal'>Crystal</option>
        <option value='ruby'>Ruby</option>
        <option value='sapphire'>Sapphire</option>
        <option value='emerald'>Emerald</option>
        <option value='firered'>Fire Red</option>
        <option value='leafgreen'>Leaf Green</option>
        <option value='diamond'>Diamond</option>
        <option value='pearl'>Pearl</option>
        <option value='platinum'>Platinum</option>
        <option value='heartgold'>Heart Gold</option>
        <option value='soulsilver'>Soul Silver</option>
        <option value='black'>Black</option>
        <option value='white'>White</option>
        <option value='black-2'>Black-2</option>
        <option value='white-2'>White-2</option>
      </select>
    </div>
  );
};

export default RightSideContainer;
