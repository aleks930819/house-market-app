import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import searchQueryReducer from '../slices/searchQuerySlice';
import listingReducer from '../slices/listingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  searchQuery: searchQueryReducer,
  listing: listingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

