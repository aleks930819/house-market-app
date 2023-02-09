import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {

      const { uid, name, email, photo } = action.payload;
      state.isLoggedIn = true;
      state.uid = uid;
      state.displayName = name;
      state.email = email;
      state.photoURL = photo;
    },
    SET_LOGOUT: (state) => {
      state.isLoggedIn = false;
      state.uid = null;
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
    },
  },
});

export const { SET_ACTIVE_USER, SET_LOGOUT } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserID = (state) => state.auth.uid;
export const selectDisplayName = (state) => state.auth.displayName;
export const selectEmail = (state) => state.auth.email;
export const selectPhotoURL = (state) => state.auth.photoURL;

export default authSlice.reducer;
