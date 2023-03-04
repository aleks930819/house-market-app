import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  imgUrls: '',
  price: '',
};

const currentListingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    SET_LISTING: (state, action) => {
      let { id, name, imgUrls, regularPrice, discountPrice } = action.payload;
      state.id = id;
      state.name = name;
      state.imgUrls = imgUrls || [];
      state.price = discountPrice || regularPrice;
    },
  },
  
});

export const { SET_LISTING } = currentListingSlice.actions;

export const selectListing = (state) => state.listing;

export default currentListingSlice.reducer;
