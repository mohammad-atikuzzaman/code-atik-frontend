import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define Site type
export interface Site {
  _id: string;
  folderId: string;
  name?: string;
  createdAt: string;
}

// State type
interface ProjectsState {
  sites: Site[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  sites: [],
  loading: false,
  error: null,
};

// Async thunk to fetch user sites
export const fetchMySites = createAsyncThunk<Site[], string>(
  "projects/fetchMySites",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/my-sites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
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
        (state, action: PayloadAction<Site[]>) => {
          state.loading = false;
          state.sites = action.payload;
        }
      )
      .addCase(fetchMySites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
