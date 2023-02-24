import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import searchQueryReducer from '../slices/searchQuerySlice';
import bookingReducer from '../slices/bookingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  searchQuery: searchQueryReducer,
  booking: bookingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

