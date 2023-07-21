import React, { useEffect } from "react";

import "./profile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Content from "../components/Content";
import Grid from "../components/Grid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
const Profile = () => {
  const movies = useSelector((store) => store.movies);
  const [USER, loading] = useAuthState(auth);
  const users = useSelector((store) => store.users);

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
  const activeUser = users?.filter((user) => user?.uid === USER?.uid);

  let favoriteMovies = allMovies?.filter((MOVIE) =>
    activeUser[0]?.saved?.some(
      (movie) => movie?.id === MOVIE?.id && movie?.type === "favorite"
    )
  );

  favoriteMovies = favoriteMovies.reduce((acc, movie) => {
    const existingMovie = acc?.find((item) => item?.id === movie?.id);

    if (!existingMovie) {
      acc.push(movie);
    }

    return acc;
  }, []);

  return (
    <div className="profile">
      <div
        className="profile-top header"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${bannarMovie?.backdrop_path})`,
        }}
      >
        <div className="movie-info" style={{ marginBottom: "100px" }}>
          <h1 className="title">My movies & Shows</h1>

          <Link to={"/"} className="discover-new-btn">
            Discover New
          </Link>
        </div>
      </div>
      <div className="profile-bottom content">
        <Grid movies={favoriteMovies} gridTitle={"Favorites"} />
      </div>
    </div>
  );
};

export default Profile;
