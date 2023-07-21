import React from "react";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import { MdOutlineWatchLater } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";

import "./content.css";
const MovieDetail = ({ movie, setShowMovieDetail }) => {
  return (
    <div className="movie-detail-container">
      <div className="movie-detail">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="image"
        />
        <button
          className="movie-detail-remove-btn"
          onClick={() => setShowMovieDetail("")}
        >
          <LiaTimesSolid />
        </button>
        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{movie.title}</h1>
          <p className="movie-detail-description">{movie.overview}</p>
        </div>
        <div className="movie-detail-extra">
          <button className="movie-detail-play-btn">
            <BsPlayCircle /> Play
          </button>
          <button className="movie-detail-watchlater-btn">
            <MdOutlineWatchLater /> Watch Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
