import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async function (page) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);

      if (!response.ok) {
        throw new Error('Данные не получены');
      }
      const data = await response.json();
      const modifiedData = data.results.map(el => {
        return {...el, liked: false}
      });

      return modifiedData;
    } catch (error) {}
  },
);

const characterSlice = createSlice({
  name: 'character',
  initialState: {
    characters: [],
    filtered: [],
    isFavorite: false,
    status: null,
    error: null,
  },
  reducers: {
    handleLike(state, action) {
      const toggledCharacter = state.characters.find(char => char.id === action.payload.id);
      toggledCharacter.liked = !toggledCharacter.liked;
      state.filtered = !state.isFavorite ? state.characters : state.characters.filter(char => char.liked);
    },
    switchFavorite(state, action) {
      state.isFavorite = action.payload.isFavorite;
      state.filtered = action.payload.isFavorite
        ? state.characters.filter((char) => char.liked)
        : state.characters;
    },
    removeCharacter(state, action) {
      state.characters = state.characters.filter((char) => char.id !== action.payload.id);
      state.filtered = !state.isFavorite ? state.characters : state.characters.filter(char => char.liked)
    },
  },
  extraReducers: {
    [fetchCharacters.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.characters = [...state.characters, ...action.payload];
      state.filtered = state.characters;
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.filtered = state.characters;
      state.status = 'error';
    },
  },
});


export const { handleLike, switchFavorite, removeCharacter } = characterSlice.actions;

export default characterSlice.reducer;
