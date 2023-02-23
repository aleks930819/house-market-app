import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import searchQueryReducer from '../slices/searchQuerySlice';

const rootReducer = combineReducers({
  auth: authReducer,
  searchQuery: searchQueryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
