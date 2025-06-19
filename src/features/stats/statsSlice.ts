import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getStats } from "./statsApi";

interface Stats {
  totalUsers: number;
  totalGeneratedSites: number;
}

interface StatsState {
  stats: Stats;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  stats: {
    totalUsers: 0,
    totalGeneratedSites: 0,
  },
  loading: false,
  error: null,
};

export const fetchStats = createAsyncThunk<Stats>(
  "stats/fetchStats",
  async () => {
    const stats = await getStats();
    return stats;
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action: PayloadAction<Stats>) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default statsSlice.reducer;
