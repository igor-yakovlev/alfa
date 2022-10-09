import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
  liked?: boolean;
};

type CharacterState = {
  characters: Character[];
  filtered: Character[];
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
    const modifiedData = data.results.map((el: Character) => {
      return { ...el, liked: false };
    });

    return modifiedData;
  },
);

const initialState: CharacterState = {
  characters: [],
  filtered: [],
  isFavorite: false,
  loading: false,
  error: null,
  hasNextPage: true,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    handleLike(state, action: PayloadAction<number>) {
      const toggledCharacter = state.characters.find((char) => char.id === action.payload);
      if (toggledCharacter) {
        toggledCharacter.liked = !toggledCharacter.liked;
      }
      state.filtered = !state.isFavorite
        ? state.characters
        : state.characters.filter((char) => char.liked);
    },
    switchFavorite(state, action: PayloadAction<boolean>) {
      state.isFavorite = action.payload;
      state.filtered = action.payload
        ? state.characters.filter((char) => char.liked)
        : state.characters;
    },
    removeCharacter(state, action: PayloadAction<number>) {
      state.characters = state.characters.filter((char) => char.id !== action.payload);
      state.filtered = !state.isFavorite
        ? state.characters
        : state.characters.filter((char) => char.liked);
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
        state.filtered = state.characters;
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

export const { handleLike, switchFavorite, removeCharacter } = characterSlice.actions;

export default characterSlice.reducer;
