import React, { useRef, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";

import { AiTwotoneHeart } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";

import "./content.css";
import MovieDetail from "./MovieDetail";
import { useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

const Grid = ({ movies, gridTitle }) => {
  const [showHeartBtn, setShowHeartBtn] = useState("");
  const [showMovieDetail, setShowMovieDetail] = useState("");

  const [USER, loading] = useAuthState(auth);
  const users = useSelector((store) => store.users);
  // get the active user
  const activeUser = users.find((user) => user?.uid == USER?.uid);

  // check is this movie in my favorite-list
  const isFavorite = (movie) => {
    let favList = activeUser?.saved?.filter(
      (moviesAndShows) =>
        moviesAndShows?.id === movie?.id && moviesAndShows?.type === "favorite"
    );
    return favList;
  };

  // handle add favorite movies
  const handleAddFavoriteMovies = async (movie) => {
    const updatedSaved = activeUser?.saved?.filter(
      (movieAndShow) =>
        movieAndShow?.id === movie?.id && movieAndShow?.type === "favorite"
    );
    if (updatedSaved.length > 0 && updatedSaved[0].type === "favorite") {
      updateDoc(doc(db, "users", activeUser?.docId), {
        saved: activeUser?.saved?.filter(
          (movieAndShow) => movieAndShow?.id !== updatedSaved[0]?.id
        ),
      });
      return;
    }
    updateDoc(doc(db, "users", activeUser?.docId), {
      saved: [
        ...activeUser?.saved,
        { id: movie?.id, type: "favorite", name: movie?.title },
      ],
    });
  };

  return (
    <div className="grid-container">
      <h3 className="grid-title">{gridTitle}</h3>

      <div className="grid">
        {movies?.map((movie) => {
          isFavorite(movie);
          return (
            <div
              key={movie.id}
              className="grid-item"
              onMouseEnter={() => setShowHeartBtn(movie.id)}
              onMouseLeave={() => setShowHeartBtn("")}
            >
              <img
                src={
                  "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                }
                alt=""
              />
              {showHeartBtn && movie.id == showHeartBtn && (
                <div
                  style={{
                    backgroundColor: "red",
                    margin: "auto",
                  }}
                >
                  <button
                    className="heart-btn"
                    onClick={() => {
                      handleAddFavoriteMovies(movie);
                    }}
                    style={{
                      color:
                        isFavorite(movie)?.length > 0 &&
                        isFavorite(movie)[0]?.id == movie?.id
                          ? "red"
                          : "rgb(181, 173, 173)",
                    }}
                  >
                    <AiTwotoneHeart />
                  </button>

                  <div>
                    <p className="grid-movie-name">
                      {movie.title.slice(0, 20)}{" "}
                      {movie.title.length > 20 && "..."}
                    </p>
                    <button
                      className="grid-movie-seemore-btn"
                      onClick={() => setShowMovieDetail(movie)}
                    >
                      <CgDetailsMore />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {showMovieDetail != "" && (
          <MovieDetail
            movie={showMovieDetail}
            setShowMovieDetail={setShowMovieDetail}
          />
        )}
      </div>
    </div>
  );
};

export default Grid;
