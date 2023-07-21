import React from "react";

import "./content.css";
import { useSelector } from "react-redux";
import Grid from "./Grid";
const Content = () => {
  let movies = useSelector((store) => store.movies);
  return (
    <div className="content">
      <Grid movies={movies?.trending} gridTitle={"Trending"} />
      <Grid movies={movies?.drama} gridTitle={"Drama"} />
      <Grid movies={movies?.action} gridTitle={"Action"} />
      <Grid movies={movies?.horror} gridTitle={"Horror"} />
      <Grid movies={movies?.comedy} gridTitle={"Comedy"} />
      <Grid movies={movies?.top_rated} gridTitle={"Top Rated"} />
      <Grid movies={movies?.animated} gridTitle={"Animated"} />
      <Grid movies={movies?.mystery} gridTitle={"Mystery"} />
    </div>
  );
};

export default Content;
