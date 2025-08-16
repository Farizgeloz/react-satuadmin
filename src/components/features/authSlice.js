import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Kirim cookie session ke server
axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

// LOGIN
export const LoginUser = createAsyncThunk("auth/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/login", {
      email: user.email,
      password: user.password,
    }, {
      withCredentials: true // ⬅️ penting agar cookie login disimpan
    });
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data; // expected { id, email, nama, ... }
  } catch (error) {
    const message = error?.response?.data?.msg || "Login gagal";
    return thunkAPI.rejectWithValue(message);
  }
});

// CEK USER DARI SESSION
export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/me");
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.msg || "Tidak terautentikasi";
    return thunkAPI.rejectWithValue(message);
  }
});

// LOGOUT
export const LogOut = createAsyncThunk("auth/LogOut", async (_, thunkAPI) => {
  try {
    await axios.post("http://localhost:5000/logout");
  } catch (error) {
    const message = error?.response?.data?.msg || "Gagal logout";
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // GET USER
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
    });

    // LOGOUT
    builder.addCase(LogOut.fulfilled, (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    });
    builder.addCase(LogOut.rejected, (state, action) => {
      state.message = action.payload;
    });
  }
});

export const { reset } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
