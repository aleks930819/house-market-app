import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
  admin: false,
  plan: 'free',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { uid, name, email, photo, } = action.payload;
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
    SET_ADMIN: (state, action) => {
      state.admin = action.payload;
    },
    SET_PLAN: (state, action) => {
      console.log(action.payload);
      state.plan = action.payload;
    },
  },
});

export const { SET_ACTIVE_USER, SET_LOGOUT, SET_ADMIN,SET_PLAN } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserID = (state) => state.auth.uid;
export const selectDisplayName = (state) => state.auth.displayName;
export const selectEmail = (state) => state.auth.email;
export const selectPhotoURL = (state) => state.auth.photoURL;
export const selectIsAdmin = (state) => state.auth.admin;
export const selectPlan = (state) => state.auth.plan;

export default authSlice.reducer;
