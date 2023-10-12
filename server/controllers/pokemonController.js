const { Pokemon } = require('../models/pokemonModels');
const { Gen1 } = require('../models/genModels');
const fetch = require('node-fetch');
const fs = require('fs');

const pokemonController = {};
let writeLocation;
let pokemonList;

//Middleware to retrieve random pokemon from the databse.
pokemonController.getPokemon = async (req, res, next) => {
  try {
    const randomPokemon = await Pokemon.aggregate([{ $sample: { size: 1 } }]);
    const { name, imageURL } = randomPokemon[0];
    res.locals.randomPokemon = { name: name, imageURL: imageURL };
    return next();
  } catch (err) {
    return next({
      log: 'Error occured in pokemonController.getPokemon middleware.',
      status: 500,
      message: 'An error occured fetching a pokemon from the database.',
    });
  }
};

// This function is for populating the database. It is the middleware that the route calls
// from server/api.js. The limit is set to 1017 because this is the number of unique pokemon
// that exist from the 3rd party API. It populates the pokemonDataList with the results of the fetch
// which include a name property and a image URL. The function returns the pokemonDataList.

pokemonController.fetchPokemonData = async (req, res, next) => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5');
  const data = await response.json();
  // console.log('data: ', data);
  const pokemonList = data.results;

  const pokemonDataList = [];

  for (const pokemon of pokemonList) {
    const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());
    const pokemonData = {
      name: pokemon.name,
      imageURL: pokemonDetails.sprites.other['official-artwork'].front_default,
      game_indices: pokemonDetails.game_indices.map(
        (index) => index.version.name
      ),
      types: pokemonDetails.types.map((type) => type.type.name),
    };
    pokemonDataList.push(pokemonData);
  }
  return pokemonDataList;
};

pokemonController.fetchGenData = async (req, res, next) => {
  const response = await fetch('https://pokeapi.co/api/v2/generation/1');
  const data = await response.json();
  // console.log('data: ', data);
  const pokemonList = await data.pokemon_species;
  console.log(pokemonList);

  const pokemonDataList = [];

  for (const pokemon of pokemonList) {
    const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());
    const pokemonData = {
      name: pokemon.name,
      // imageURL: pokemonDetails.sprites.other['official-artwork'].front_default,
      // types: pokemonDetails.types.map((type) => type.type.name),
    };
    pokemonDataList.push(pokemonData);
  }
  return pokemonDataList;
};
module.exports = pokemonController;
