import {configureStore} from '@reduxjs/toolkit';
import characterReducer from './characterSlice';

export default configureStore({
  reducer: {
    characters: characterReducer,
  }
})