import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "./usersApi";

interface Users {
  _id: string;
  folderId: string;
  name?: string;
  createdAt: string;
}

interface UsersState {
  users: Users[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "sites/fetchSites",
  async (token: string) => {
    const users = await getUsers(token);
    return users;
  }
);

const usersSlice = createSlice({
  name: "sites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
