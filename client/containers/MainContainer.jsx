import React from 'react';
import Header from '../components/Header.jsx';
import Pokemon from '../components/Pokemon.jsx';
import UserInput from '../components/UserInput.jsx';
// Import hooks from react-redux
import { useSelector, useDispatch } from 'react-redux';
import { setScore, setHardmode, setPokemon } from '../redux/gameSlice';
// import Bulbasaur from '../images/bulbasaur.png';

/*

/////// MAIN CONTAINER \\\\\\\
Holds Header, Pokemon, and User Input components.
- Inherits score, pokemon, and hardmode state and setter functions from App
- We've commented out a local test image, Bublasaur, that can be used to test the setPokemon function:
  - i.e. setPokemon({ name: 'bulbasaur', image: `${Bulbasaur}` });

*/

const MainContainer = () => {
  const dispatch = useDispatch();

  // access state from the store
  const score = useSelector((state) => state.game.score);
  const pokemon = useSelector((state) => state.game.pokemon);
  const hardmode = useSelector((state) => state.game.hardmode);
  const genChoice = useSelector((state) => state.game.genChoice);

  // Fetch new pokemon from the database:
  const getNewPokemon = async () => {
    // Makes fetch request to server to get a random new pokemon
    // expected result: {name: <pokemon name>, image: <image URI>}
    // result is converted to JSON and then passed through the setter function
    //  - this updates pokemon state with newly-fetched pokemon
    try {
      const result = await fetch(`/pokemon`, {
        // add /${genChoice} after pokemon to send to backend
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const getPokemon = await result.json();

      // Dispatch setPokemon action to update store
      dispatch(setPokemon(getPokemon));
    } catch (error) {
      alert(`${error}: failed to load Pokemon`);
    }
  };

  return (
    <div id='MainContainer'>
      <Header />
      <Pokemon
        pokemon={pokemon}
        getNewPokemon={getNewPokemon}
        hardmode={hardmode}
        setHardmode={(value) => dispatch(setHardmode(value))}
      />
      <UserInput
        score={score}
        setScore={(value) => dispatch(setScore(value))}
        getNewPokemon={getNewPokemon}
        pokemon={pokemon}
      />
    </div>
  );
};
export default MainContainer;
