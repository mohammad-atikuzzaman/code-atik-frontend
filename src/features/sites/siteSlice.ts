import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSites } from "./sitesApi";

interface Site {
  _id: string;
  folderId: string;
  name?: string;
  createdAt: string;
}

interface SitesState {
  sites: Site[];
  loading: boolean;
  error: string | null;
}

const initialState: SitesState = {
  sites: [],
  loading: false,
  error: null,
};

export const fetchSites = createAsyncThunk(
  "sites/fetchSites",
  async (token: string) => {
    const sites = await getSites(token);
    return sites;
  }
);

const sitesSlice = createSlice({
  name: "sites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.sites = action.payload;
        state.loading = false;
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sitesSlice.reducer;
