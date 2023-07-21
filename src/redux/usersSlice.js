import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", (users) => {
  return users;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    loadUsers: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

// this is for dispatch
export const { loadUsers } = usersSlice.actions;

// this is for configureStore
export default usersSlice.reducer;
