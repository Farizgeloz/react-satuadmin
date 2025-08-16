import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../components/features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});
