import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/request";

export const registerUserApi = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().post("auth/register", data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Register failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Register failed",
      });
    }
  }
);

export const loginUserApi = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().post("auth/login", data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Login failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Login failed",
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
    isCreated: false,
    isLogined: false,
    redirectToAdmin: false,
  },
  reducers: {
    resetData: (state) => {
      state.loading = false;
      state.error = null;
      state.isCreated = false;
      state.isLogined = false;
    },
  },
  extraReducers: {
    // register
    [registerUserApi.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUserApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.isCreated = true;
      state.user = action.payload;
    },
    [registerUserApi.rejected]: (state, action) => {
      state.loading = false;
      state.isCreated = false;
      state.error = action.payload;
    },
    // login
    [loginUserApi.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUserApi.fulfilled]: (state, action) => {
      localStorage.setItem("isLogin", true);
      localStorage.setItem("orionToken", action.payload._token);
      if (action.payload.role === "admin") {
        state.redirectToAdmin = true;
      } else {
        state.loading = false;
      }
      state.user = action.payload;
      state.isLogined = true;
    },
    [loginUserApi.rejected]: (state, action) => {
      localStorage.setItem("isLogin", false);
      localStorage.removeItem("orionToken");
      state.loading = false;
      state.user = null;
      state.isLogined = false;
    },
  },
});

export const { resetData } = authSlice.actions;

export default authSlice.reducer;
