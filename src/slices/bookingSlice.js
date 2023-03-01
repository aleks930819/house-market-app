import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  imgUrls: '',
  price: '',
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    SET_BOOKING: (state, action) => {
      let { id, name, imgUrls, regularPrice, discountPrice } = action.payload;

      state.id = id;
      state.name = name;
      state.imgUrls = imgUrls || [];
      state.price = discountPrice || regularPrice;
    },
  },
});

export const { SET_BOOKING, SET_BOOKING_TO_EMPTY } = bookingSlice.actions;

export const selectBooking = (state) => state.booking;

export default bookingSlice.reducer;
