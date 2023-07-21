import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", (users) => {
  return users;
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {},
  reducers: {
    loadMovies: (state, action) => {
      return (state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

// this is for dispatch
export const { loadMovies } = moviesSlice.actions;

// this is for configureStore
export default moviesSlice.reducer;
