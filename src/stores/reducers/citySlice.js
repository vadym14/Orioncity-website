import API from "../../config/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCityApi = createAsyncThunk(
  "cities/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().post(`cities/add`, data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Get projects home failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Get projects home failed",
      });
    }
  }
);

export const getDetailCityApi = createAsyncThunk(
  "cities/detail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API().get(`cities/detail/${id}`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Get projects home failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Get projects home failed",
      });
    }
  }
);

export const getAllCitiesApi = createAsyncThunk(
  "cities/all",
  async (rejectWithValue) => {
    try {
      const response = await API().get(`cities`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Get projects home failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Get projects home failed",
      });
    }
  }
);

export const updateDetailCityapi = createAsyncThunk(
  "cities/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().put(`cities/detail/${data.id}`, data.values);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Get projects home failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Get projects home failed",
      });
    }
  }
);

export const deleteCityApi = createAsyncThunk(
  "cities/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API().delete(`cities/detail/${id}`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Get projects home failed",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Get projects home failed",
      });
    }
  }
);

const citySlice = createSlice({
  name: "cities",
  initialState: {
    citiesOfProjects: [],
    cityDetail: null,
    isCreatedCity: false,
    isDeletedCity: false,
    isUpdatedCity: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetData: (state) => {
      state.isCreatedCity = false;
      state.isDeletedCity = false;
      state.isUpdatedCity = false;
      state.cityDetail = null;
      state.error = null;
    },
  },
  extraReducers: {
    // create city
    [createCityApi.pending]: (state) => {
      state.loading = true;
    },
    [createCityApi.fulfilled]: (state) => {
      state.loading = false;
      state.isCreatedCity = true;
    },
    [createCityApi.rejected]: (state, action) => {
      state.loading = false;
      state.isCreatedCity = false;
      state.error = action.payload;
    },
    // get all cities
    [getAllCitiesApi.pending]: (state) => {
      state.loading = true;
    },
    [getAllCitiesApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.citiesOfProjects = action.payload;
    },
    [getAllCitiesApi.rejected]: (state, action) => {
      state.loading = false;
      state.citiesOfProjects = [];
      state.error = action.payload;
    },
    // get detail city
    [getDetailCityApi.pending]: (state) => {
      state.loading = true;
    },
    [getDetailCityApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.cityDetail = action.payload;
    },
    [getDetailCityApi.rejected]: (state, action) => {
      state.loading = false;
      state.cityDetail = null;
      state.error = action.payload;
    },
    // update detail city
    [updateDetailCityapi.pending]: (state) => {
      state.loading = true;
    },
    [updateDetailCityapi.fulfilled]: (state) => {
      state.loading = false;
      state.isUpdatedCity = true;
    },
    [updateDetailCityapi.rejected]: (state, action) => {
      state.loading = false;
      state.isUpdatedCity = false;
      state.error = action.payload;
    },
    // delete city
    [deleteCityApi.pending]: (state) => {
      state.loading = true;
    },
    [deleteCityApi.fulfilled]: (state) => {
      state.loading = false;
      state.isDeletedCity = true;
    },
    [deleteCityApi.rejected]: (state, action) => {
      state.loading = false;
      state.isDeletedCity = false;
      state.error = action.payload;
    },
  },
});

export const { resetData } = citySlice.actions;

export default citySlice.reducer;
