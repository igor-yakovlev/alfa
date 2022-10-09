import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../domain/character';

type CharacterState = {
  characters: Character[];
  isFavorite: boolean;
  loading: boolean;
  error: null | string;
  hasNextPage: boolean;
};

export const fetchCharacters = createAsyncThunk<Character[], number, { rejectValue: string }>(
  'characters/fetchCharacters',
  async function (page, { rejectWithValue }) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);

    if (!response.ok) {
      return rejectWithValue('Server error');
    }
    const data = await response.json();
    if (data.info.pages === page) {
      return rejectWithValue('Last element');
    }
    return  data.results.map((el: Character) => ({ ...el, liked: false }));
  },
);

const initialState: CharacterState = {
  characters: [],
  isFavorite: false,
  loading: false,
  error: null,
  hasNextPage: true,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    likeCharacter(state, action: PayloadAction<number>) {
      const toggledCharacter = state.characters.find((it) => it.id === action.payload);
        toggledCharacter!.liked = !toggledCharacter!.liked;
    },
    switchFavorite(state, action: PayloadAction<boolean>) {
      state.isFavorite = action.payload;
    },
    removeCharacter(state, action: PayloadAction<number>) {
      state.characters = state.characters.filter((it) => it.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters = [...state.characters, ...action.payload];
        state.loading = false;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === 'Last element') {
          state.hasNextPage = false;
        } else if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const { likeCharacter, switchFavorite, removeCharacter } = characterSlice.actions;

export default characterSlice.reducer;
