import { configureStore } from "@reduxjs/toolkit";
import movies from "./moviesSlice";
import users from "./usersSlice";

export default configureStore({
  reducer: { movies, users },
});
