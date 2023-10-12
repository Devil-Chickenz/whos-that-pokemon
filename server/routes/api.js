const express = require('express');
const pokemonController = require('../controllers/pokemonController');
const userController = require('../controllers/userController');
const { Pokemon } = require('../models/pokemonModels');
const cookieController = require('../controllers/cookieController');
const { Gen1 } = require('../models/genModels');

const router = express.Router();
router.use(express.json());

//Route to retieve random pokemon data using the getpokemon middleware from pokemon controller
//Returns the json responce containing the random pokemon data
router.get('/', pokemonController.getPokemon, (req, res) => {
  return res.status(200).json(res.locals.randomPokemon);
});

// Route to handle user registration using the createUser middleware from userController.
// Returns a JSON response indicating that the user has been added to the database.
router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json('Added user to the db');
});

// Route to handle user login using the loginUser middleware from userController.
// Returns a JSON response indicating that the user is logged in.
router.post(
  '/login',
  userController.loginUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('login response body', res.locals.existingUser);
    return res.status(200).json(res.locals.existingUser);
  }
);

router.get('/leaderboard', userController.getLeaderboard, (req, res) => {
  return res.status(200).json(res.locals.leaderboard);
});

router.get('/leaderboard/:id', userController.getHighScore, (req, res) => {
  return res.status(200).json(res.locals.highScore);
});

router.post('/leaderboard/:id', userController.updateHighScore, (req, res) => {
  return res.status(200).json(res.locals.newHighScore);
});

// This router is designed to populate your database. It looks unconventional, but it does work.
// Essentially, the router calls our middleware function, fetchPokemonData, to populate an array
// of pokemon objects from the 3rd party api. It runs pokemon.create on this array, which then populates
// the database with all of the pokemon names and image URLs. Note, you will need to provide your own
// mongoDB connection URL.

router.get('/fetch-and-store-pokemons', async (req, res) => {
  try {
    const pokemonDataList = await pokemonController.fetchPokemonData();
    console.log(pokemonDataList);
    await Pokemon.create(pokemonDataList);
    console.log(`Stored ${pokemonDataList.length} Pokémon in the database.`);
    res.json({
      message: `Stored ${pokemonDataList.length} Pokémon in the database.`,
    });
  } catch (error) {
    console.error(`Error fetching/storing data for Pokémon: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/fetch-and-store-gens', async (req, res) => {
  try {
    const pokemonDataList = await pokemonController.fetchGenData();
    console.log(pokemonDataList);
    await Gen1.create(pokemonDataList);
    console.log(`Stored ${pokemonDataList.length} Pokémon in the database.`);
    res.json({
      message: `Stored ${pokemonDataList.length} Pokémon in the database.`,
    });
  } catch (error) {
    console.error(`Error fetching/storing data for Pokémon: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
