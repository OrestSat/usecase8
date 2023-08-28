import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../app/modules/Users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});