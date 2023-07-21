import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchMovies } from "./redux/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

import { db } from "./config/firebase";

import { collection, onSnapshot } from "firebase/firestore";

import axios from "axios";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import "./app.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { fetchUsers } from "./redux/usersSlice";
import ProtectedRoute from "./ProtectedRoute";
import Credit from "./Credit";

function App() {
  const dispatch = useDispatch();
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const fetch = async () => {
      let fetchedMovies;

      // trending
      const trending = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=a19768f7c3fa6f84712304479a7c59e1"
      );

      //horror
      const horror = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=a19768f7c3fa6f84712304479a7c59e1&with_genres=27&sort_by=popularity.desc"
      );

      // action
      const action = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=a19768f7c3fa6f84712304479a7c59e1&with_genres=28&sort_by=popularity.desc"
      );

      // comedy
      const comedy = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=a19768f7c3fa6f84712304479a7c59e1&with_genres=35&sort_by=popularity.desc"
      );

      // mystery
      const mystery = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=a19768f7c3fa6f84712304479a7c59e1&with_genres=9648&sort_by=popularity.desc"
      );

      // animated
      const animated = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=a19768f7c3fa6f84712304479a7c59e1&with_genres=16&sort_by=popularity.desc"
      );

      // drama
      const drama = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=a19768f7c3fa6f84712304479a7c59e1&with_genres=18&sort_by=popularity.desc"
      );

      // top rated
      const top_rated = await axios.get(
        " https://api.themoviedb.org/3/movie/top_rated?api_key=a19768f7c3fa6f84712304479a7c59e1"
      );

      fetchedMovies = {
        horror: horror?.data.results,
        comedy: comedy?.data.results,
        top_rated: top_rated?.data.results,
        trending: trending?.data.results,
        animated: animated?.data.results,
        action: action?.data.results,
        mystery: mystery?.data.results,
        drama: drama?.data.results,
      };

      //calling fetchmovies
      dispatch(fetchMovies(fetchedMovies));
    };
    fetch();
    return () => fetch;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), docId: doc.id });
      });
      dispatch(fetchUsers(users));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
      <Credit />
    </div>
  );
}

export default App;
