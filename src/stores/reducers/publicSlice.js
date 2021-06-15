import { createSlice } from "@reduxjs/toolkit";

const publicSlice = createSlice({
  name: "public",
  initialState: {
    sidebarShow: "responsive",
    asideShow: false,
    darkMode: false,
  },
  reducers: {
    changeSider: (state, action) => {
      state.sidebarShow = action.payload;
    },
    changeAsideShow: (state, action) => {
      state.asideShow = action.payload;
    },
    changeDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const {
  changeAsideShow,
  changeSider,
  changeDarkMode,
} = publicSlice.actions;

export default publicSlice.reducer;
