import { createSlice } from '@reduxjs/toolkit';

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState: {
    searchQuery: '',
    result: [],
  },
  reducers: {
    SET_SEARCH_QUERY: (state, action) => {
      state.searchQuery = action.payload;
    },
    SET_SEARCH_RESULT: (state, action) => {
      state.result = action.payload;
    },

    SET_SEARCH_RESULT_TO_EMPTY: (state) => {
      state.result = [];
    },
  },
});

export const {
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULT,
  SET_SEARCH_RESULT_TO_EMPTY,
} = searchQuerySlice.actions;

export const selectSearchQuery = (state) => state.searchQuery.searchQuery;
export const selectSearchResult = (state) => state.searchQuery.result;

export default searchQuerySlice.reducer;
