import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
