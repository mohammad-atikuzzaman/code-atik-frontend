import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProjects } from "./projectsApi";

// Define Site type
export interface Projects {
  _id: string;
  folderId: string;
  name?: string;
  createdAt: string;
}

// State type
interface ProjectsState {
  projects: Projects[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

// Async thunk to fetch user sites
export const fetchMySites = createAsyncThunk<Projects[], string>(
  "projects/fetchMySites",
  async (token) => {
    const projects = getProjects(token);
    return projects;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMySites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMySites.fulfilled,
        (state, action: PayloadAction<Projects[]>) => {
          state.loading = false;
          state.projects = action.payload;
        }
      )
      .addCase(fetchMySites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
