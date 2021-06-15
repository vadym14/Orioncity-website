import { configureStore } from "@reduxjs/toolkit";

import publicReducer from "./reducers/publicSlice";
import authReducer from "./reducers/authSlice";
import userReducer from "./reducers/userSlice";
import projectReducer from "./reducers/projectSlice";
import cityReducer from "./reducers/citySlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    public: publicReducer,
    projects: projectReducer,
    cities: cityReducer,
  },
});
