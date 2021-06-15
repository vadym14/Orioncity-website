import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../config/request";

export const getProfileApi = createAsyncThunk(
  "users/profile",
  async (rejectWithValue) => {
    try {
      const response = await API().get("users/profile");
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Get profile failed",
        });
      }
      return rejectWithValue({
        message: error.data.msg,
        name: "Get profile failed",
      });
    }
  }
);

export const updateProfileInfoApi = createAsyncThunk(
  "users/profile/info",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().put("users/profile/info", data);
      console.log("response: ", response);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Update profile failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Update profile failed",
      });
    }
  }
);

export const updateProfileAvatarApi = createAsyncThunk(
  "users/profile/upload-avatar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().post("users/profile/avatar", data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Update profile failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Update profile failed",
      });
    }
  }
);

export const updateProfileBackgroundApi = createAsyncThunk(
  "users/profile/upload-background",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().post("users/profile/background", data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Update profile failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Update profile failed",
      });
    }
  }
);

export const getAllUsersApi = createAsyncThunk(
  "users/all",
  async (rejectWithValue) => {
    try {
      const response = await API().get("users");

      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Get all users failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Get all users failed",
      });
    }
  }
);

export const getUserDetailApi = createAsyncThunk(
  "users/detail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API().get(`users/detail/${id}`);

      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Get user failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Get user failed",
      });
    }
  }
);

export const createUserApi = createAsyncThunk(
  "users/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().post("users/create", data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Get user failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Get user failed",
      });
    }
  }
);

export const updateUserApi = createAsyncThunk(
  "users/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().put(`users/detail/${data.id}`, data.values);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Update user failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Update user failed",
      });
    }
  }
);

export const deleteUserApi = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API().delete(`users/detail/${id}`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Update user failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Update user failed",
      });
    }
  }
);

export const getAllUsersInvestorApi = createAsyncThunk(
  "users/investor",
  async (rejectWithValue) => {
    try {
      const response = await API().get(`users/investor`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Update user failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Update user failed",
      });
    }
  }
);

const userSlice = createSlice({
  name: "users/profile",
  initialState: {
    loading: false,
    user: null,
    userDetail: null,
    users: [],
    usersInvestor: [],
    error: null,
    isUpdatedInfo: false,
    isUploadedAvatar: false,
    isUploadedBackground: false,
    isUpdatedUserDetail: false,
    isDeletedUser: false,
    isCreatedUser: false,
  },
  reducers: {
    resetData: (state) => {
      state.loading = false;
      state.error = null;
      state.isUpdatedInfo = false;
      state.isUploadedAvatar = false;
      state.isUploadedBackground = false;
      state.isCreatedUser = false;
      state.isUpdatedUserDetail = false;
      state.isDeletedUser = false;
    },
  },
  extraReducers: {
    [getProfileApi.pending]: (state) => {
      state.loading = true;
    },
    [getProfileApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getProfileApi.rejected]: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    // update profile info
    [updateProfileInfoApi.pending]: (state) => {
      state.loading = true;
    },
    [updateProfileInfoApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isUpdatedInfo = true;
    },
    [updateProfileInfoApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUpdatedInfo = false;
      state.user = null;
    },
    // update profile avatar
    [updateProfileAvatarApi.pending]: (state) => {
      state.loading = true;
    },
    [updateProfileAvatarApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUploadedAvatar = true;
      state.user = action.payload;
    },
    [updateProfileAvatarApi.rejected]: (state, action) => {
      state.loading = false;
      state.isUploadedAvatar = false;
      state.user = null;
      state.error = action.payload;
    },
    // update profile background
    [updateProfileBackgroundApi.pending]: (state) => {
      state.loading = true;
    },
    [updateProfileBackgroundApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUploadedBackground = true;
      state.user = action.payload;
    },
    [updateProfileBackgroundApi.rejected]: (state, action) => {
      state.loading = false;
      state.isUploadedBackground = false;
      state.user = null;
      state.error = action.payload;
    },
    // get all users
    [getAllUsersApi.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsersApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getAllUsersApi.rejected]: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    },
    // get user detail
    [getUserDetailApi.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetailApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
    },
    [getUserDetailApi.rejected]: (state, action) => {
      state.loading = false;
      state.userDetail = null;
      state.error = action.payload;
    },
    // create user
    [createUserApi.pending]: (state) => {
      state.loading = true;
    },
    [createUserApi.fulfilled]: (state, action) => {
      console.log("action: ", action.payload);
      state.loading = false;
      state.isCreatedUser = true;
    },
    [createUserApi.rejected]: (state, action) => {
      state.loading = false;
      state.isCreatedUser = false;
      state.error = action.payload;
    },
    // update user
    [updateUserApi.pending]: (state) => {
      state.loading = true;
    },
    [updateUserApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdatedUserDetail = true;
      state.userDetail = action.payload;
    },
    [updateUserApi.rejected]: (state, action) => {
      state.loading = false;
      state.isUpdatedUserDetail = false;
      state.userDetail = null;
      state.error = action.payload;
    },
    // delete user
    [deleteUserApi.pending]: (state) => {
      state.loading = true;
    },
    [deleteUserApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeletedUser = true;
    },
    [deleteUserApi.rejected]: (state, action) => {
      state.loading = false;
      state.isDeletedUser = false;
      state.error = action.payload;
    },
    // get all users role Investor
    [getAllUsersInvestorApi.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsersInvestorApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersInvestor = action.payload;
    },
    [getAllUsersInvestorApi.rejected]: (state, action) => {
      state.usersInvestor = [];
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { resetData } = userSlice.actions;

export default userSlice.reducer;
