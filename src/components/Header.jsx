import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import { MdOutlineWatchLater } from "react-icons/md";

import "./header.css";
import { useSelector } from "react-redux";
const Header = () => {
  const movies = useSelector((store) => store.movies);

  let allMovies = [];
  movies?.drama?.map((movie) => allMovies.push(movie));
  movies?.action?.map((movie) => allMovies.push(movie));
  movies?.comedy?.map((movie) => allMovies.push(movie));
  movies?.horror?.map((movie) => allMovies.push(movie));
  movies?.mystery?.map((movie) => allMovies.push(movie));
  movies?.animation?.map((movie) => allMovies.push(movie));
  movies?.trending?.map((movie) => allMovies.push(movie));
  movies?.top_rated?.map((movie) => allMovies.push(movie));

  let number = Math.floor(Math.random() * allMovies?.length - 2);
  const bannarMovie = allMovies[number];

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${bannarMovie?.backdrop_path})`,
      }}
    >
      <div className="movie-info">
        <h1 className="title">{bannarMovie?.title}</h1>
        <p className="description">
          {bannarMovie?.overview.slice(0, 150)}
          {bannarMovie?.overview.length > 150 && "..."}
        </p>
        <div className="header-buttons">
          <button className="play-now-btn">
            <BsPlayCircle /> Play
          </button>
          <button className="watch-later-btn">
            <MdOutlineWatchLater /> Watch Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
