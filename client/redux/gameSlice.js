import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  score: 0,
  lives: 3,
  hardmode: false,
  genChoice: 'all',
  pokemon: {},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setHardmode: (state, action) => {
      state.hardmode = action.payload;
    },
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
    setLives: (state, action) => {
      state.lives = action.payload;
    },
    setGenChoice: (state, action) => {
      state.genChoice = action.payload;
    },
  },
});

export const { setScore, setHardmode, setPokemon, setLives, setGenChoice } =
  gameSlice.actions;
export default gameSlice.reducer;
