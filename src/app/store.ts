import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import statsReducer from "../features/stats/statsSlice";
import sitesReducer from "../features/sites/siteSlice";
import projectsReducer from "../features/projects/projectSlice";
import usersReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stats: statsReducer,
    sites: sitesReducer,
    projects: projectsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
