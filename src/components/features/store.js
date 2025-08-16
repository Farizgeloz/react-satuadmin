import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // <- sesuaikan path dengan lokasi file authSlice.js

const store = configureStore({
  reducer: {
    auth: authReducer, // nama state: 'auth'
  },
});

export default store;