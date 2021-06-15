import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/request";

export const getHomeProjectsApi = createAsyncThunk(
  "projects/home",
  async (pagination, { rejectWithValue }) => {
    try {
      const response = await API().get(
        `projects/home?offset=${pagination.offset}&limit=${pagination.limit}`
      );
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

export const getMyProjectsDashboardApi = createAsyncThunk(
  "projects/my-dashboard",
  async (rejectWithValue) => {
    try {
      const response = await API().get(`projects/my-projects`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

export const getDetailProjectHomeApi = createAsyncThunk(
  "projects/detail-home",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API().get(`projects/home/${id}`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

export const getDetailMyProjectApi = createAsyncThunk(
  "projects/my-project-detail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API().get(`projects/my-projects/${id}`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

export const getProductsHollywoodApi = createAsyncThunk(
  "projects/hollywood",
  async (rejectWithValue) => {
    try {
      const response = await API().get(`projects/west-hollywood`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

export const getProductsSilverLakeApi = createAsyncThunk(
  "projects/silver-lake",
  async (rejectWithValue) => {
    try {
      const response = await API().get(`projects/silver-lake`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

// ======= admin ======
export const createProjectApi = createAsyncThunk(
  "projects/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().post(`projects/add`, data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

export const getAllProjectsApi = createAsyncThunk(
  "projects/all",
  async (rejectWithValue) => {
    try {
      const response = await API().get(`projects`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

export const deleteProjectApi = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API().delete(`projects/${id}`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

export const getDetailProject = createAsyncThunk(
  "projects/detail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API().get(`projects/${id}`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

export const updateProjectApi = createAsyncThunk(
  "project/detail/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API().post(
        `projects/detail/${data.id}`,
        data.values
      );
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

export const getProjectsOfCityApi = createAsyncThunk(
  "projects/city",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API().get(`projects/cities/${id}`);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        return rejectWithValue({
          message: error.response.message,
          name: "Error",
        });
      }
      return rejectWithValue({
        message: error.data.message,
        name: "Error",
      });
    }
  }
);

const projectSlice = createSlice({
  name: "projects/home",
  initialState: {
    loading: false,
    error: null,
    offset: 0,
    limit: 5,
    flagProjects: [],
    myProjects: [],
    chartData: null,
    homeProjectDetail: null,
    myProjectDetail: null,
    silverLakeProjects: [],
    hollywoodProjects: [],
    hasMore: true,
    units: [],
    unit: null,
    // city
    cityDetailInfo: null,
    projectsOfCity: [],
    // admin
    adminProjects: [],
    projectDetail: null,
    isCreatedProject: false,
    isUpdatedProject: false,
    isDeletedProject: false,
  },
  reducers: {
    resetData: (state) => {
      state.loading = false;
      state.error = null;
      state.flagProjects = [];
      state.myProjects = [];
      state.homeProjectDetail = null;
      state.myProjectDetail = null;
      state.adminProjects = [];
      state.isCreatedProject = false;
      state.isUpdatedProject = false;
      state.isDeletedProject = false;
    },
    loadMorePagination: (state) => {
      state.offset = state.offset + 1;
    },
    resetPagination: (state) => {
      state.offset = 0;
    },
    // units
    createUnit: (state, action) => {
      state.units = [action.payload, ...state.units];
    },
    setDataUnits: (state, action) => {
      state.units = action.payload;
    },
    resetDataUnits: (state) => {
      state.units = [];
    },
    resetFormUnit: (state) => {
      state.unit = null;
    },
  },
  extraReducers: {
    // home projects
    [getHomeProjectsApi.pending]: (state) => {
      state.loading = true;
    },
    [getHomeProjectsApi.fulfilled]: (state, action) => {
      if (action.payload.length < state.limit) {
        state.hasMore = false;
      }
      state.loading = false;
      state.flagProjects = state.flagProjects.concat(action.payload);
    },
    [getHomeProjectsApi.rejected]: (state, action) => {
      state.loading = false;
      state.flagProjects = [];
      state.error = action.payload;
    },
    // get detail project home page
    [getDetailProjectHomeApi.pending]: (state) => {
      state.loading = true;
    },
    [getDetailProjectHomeApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.homeProjectDetail = action.payload;
    },
    [getDetailProjectHomeApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.homeProjectDetail = null;
    },
    // my projects
    [getMyProjectsDashboardApi.pending]: (state) => {
      state.loading = true;
    },
    [getMyProjectsDashboardApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.myProjects = action.payload.projects;
      state.chartData = action.payload.chartData;
    },
    [getMyProjectsDashboardApi.rejected]: (state, action) => {
      state.loading = false;
      state.myProjects = [];
      state.error = action.error;
    },
    // my project detail
    [getDetailMyProjectApi.pending]: (state) => {
      state.loading = true;
    },
    [getDetailMyProjectApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.myProjectDetail = action.payload;
    },
    [getDetailMyProjectApi.rejected]: (state, action) => {
      state.loading = false;
      state.myProjectDetail = null;
      state.error = action.payload;
    },
    // get projects silver lake
    [getProductsSilverLakeApi.pending]: (state) => {
      state.loading = true;
    },
    [getProductsSilverLakeApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.silverLakeProjects = action.payload;
    },
    [getProductsSilverLakeApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.silverLakeProjects = [];
    },
    // get projects west hollywood
    [getProductsHollywoodApi.pending]: (state) => {
      state.loading = true;
    },
    [getProductsHollywoodApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.hollywoodProjects = action.payload;
    },
    [getProductsHollywoodApi.rejected]: (state, action) => {
      state.loading = false;
      state.hollywoodProjects = [];
      state.error = action.payload;
    },
    // create project
    [createProjectApi.pending]: (state) => {
      state.loading = true;
    },
    [createProjectApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.isCreatedProject = true;
      state.projectDetail = action.payload;
    },
    [createProjectApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isCreatedProject = false;
      state.projectDetail = null;
    },
    // get all projects
    [getAllProjectsApi.pending]: (state) => {
      state.loading = true;
    },
    [getAllProjectsApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminProjects = action.payload;
    },
    [getAllProjectsApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.adminProjects = [];
    },
    // delete project
    [deleteProjectApi.pending]: (state) => {
      state.loading = true;
    },
    [deleteProjectApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeletedProject = true;
    },
    [deleteProjectApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isDeletedProject = false;
    },
    // get detail project
    [getDetailProject.pending]: (state) => {
      state.loading = true;
    },
    [getDetailProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.projectDetail = action.payload;
    },
    [getDetailProject.rejected]: (state, action) => {
      state.loading = false;
      state.projectDetail = null;
      state.error = action.payload;
    },
    // update project
    [updateProjectApi.pending]: (state) => {
      state.loading = true;
    },
    [updateProjectApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdatedProject = true;
      state.projectDetail = action.payload;
    },
    [updateProjectApi.rejected]: (state, action) => {
      state.loading = false;
      state.isUpdatedProject = false;
      state.error = action.payload;
    },
    // get projects of city
    [getProjectsOfCityApi.pending]: (state) => {
      state.loading = true;
    },
    [getProjectsOfCityApi.fulfilled]: (state, action) => {
      console.log('action: ', action.payload)
      state.loading = false;
      state.cityDetailInfo = action.payload;
    },
    [getProjectsOfCityApi.rejected]: (state, action) => {
      state.loading = false;
      state.projectsOfCity = [];
      state.cityDetailInfo = null;
    },
  },
});

export const {
  resetData,
  resetPagination,
  loadMorePagination,
  // units
  createUnit,
  setDataUnits,
  resetDataUnits,
  resetFormUnit,
} = projectSlice.actions;

export default projectSlice.reducer;
