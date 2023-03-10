import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
  admin: false,
  plan: 'free',
  subscriptionId: null,
  listings: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { uid, displayName, email, photoURL } = action.payload;
      state.isLoggedIn = true;
      state.uid = uid;
      state.displayName = displayName;
      state.email = email;
      state.photoURL = photoURL;
    },
    SET_LOGOUT: (state) => {
      state.isLoggedIn = false;
      state.uid = null;
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
      state.plan = 'free';
    },
    SET_ADMIN: (state, action) => {
      state.admin = action.payload;
    },
    SET_PLAN: (state, action) => {
      state.plan = action.payload;
    },
    SET_SUBSCRIPTION_ID: (state, action) => {
      state.subscriptionId = action.payload;
    },
    SET_LISTINGS: (state, action) => {
      state.listings = action.payload;
    },
  },
});

export const {
  SET_ACTIVE_USER,
  SET_LOGOUT,
  SET_ADMIN,
  SET_PLAN,
  SET_SUBSCRIPTION_ID,
} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserID = (state) => state.auth.uid;
export const selectDisplayName = (state) => state.auth.displayName;
export const selectEmail = (state) => state.auth.email;
export const selectPhotoURL = (state) => state.auth.photoURL;
export const selectIsAdmin = (state) => state.auth.admin;
export const selectPlan = (state) => state.auth.plan;
export const selectSubscriptionId = (state) => state.auth.subscriptionId;
export const selectListings = (state) => state.auth.listings;

export default authSlice.reducer;
