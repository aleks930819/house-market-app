import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  reservetions: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    SET_BOOKING: (state, action) => {
      let { id, name, reservetions } = action.payload;

      state.id = id;
      state.name = name;
      state.reservetions = reservetions || [];
    },
    SET_BOOKING_TO_EMPTY: (state) => {
      state.id = '';
      state.name = '';
      state.reservetions = [];
    },
  },
});

export const { SET_BOOKING, SET_BOOKING_TO_EMPTY } = bookingSlice.actions;

export const selectBooking = (state) => state.booking;

export default bookingSlice.reducer;
