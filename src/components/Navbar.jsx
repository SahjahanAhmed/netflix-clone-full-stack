import React, { useRef, useState } from "react";
import { FaPowerOff, FaSearch } from "react-icons/fa";

import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../resources/logo.webp";

import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
const Navbar = () => {
  const [searchBarOpen, setsearchBarOpen] = useState(false);

  const [signOutTooltip, setSignOutTooltip] = useState("");
  const [profileTooltip, setProfileTooltip] = useState("");

  const navRef = useRef();
  const navigate = useNavigate();
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 70) {
      navRef.current.style.backgroundColor = "rgba(0,0,0,.8)";
    } else {
      navRef.current.style.backgroundColor = "transparent";
    }
  });

  // tooltip
  const tooltip = (tooltipText) => {
    if (tooltipText === "Sign out") {
      setSignOutTooltip(tooltipText);
    } else if (tooltipText === "Profile") {
      setProfileTooltip(tooltipText);
    } else {
      setProfileTooltip("");
      setSignOutTooltip("");
    }
  };

  const users = useSelector((store) => store.users);
  const [USER, loading] = useAuthState(auth);
  // get the active users data
  const activeUser = users.find((user) => user?.uid == USER?.uid);

  return (
    <div className="navbar" ref={navRef}>
      <div className="logo nav-left">
        <Link to={"/"}>
          <img src={logo} alt="netflix" />
        </Link>
      </div>
      <div className="nav-middle">
        <label
          htmlFor="search"
          onClick={() => setsearchBarOpen(!searchBarOpen)}
        >
          <FaSearch />
        </label>
        <input
          type="search"
          id="search"
          autoComplete="off"
          style={{ display: searchBarOpen ? "inline-block" : "none" }}
        />
      </div>
      <div className="nav-right">
        <Link
          to={"/sign-in"}
          className="btn sign-out-btn"
          onClick={() => {
            signOut(auth);
            navigate("/sign-in");
            localStorage.setItem("active", false);
          }}
          onMouseEnter={() => tooltip("Sign out")}
          onMouseLeave={() => tooltip("")}
        >
          <FaPowerOff />
          {signOutTooltip && <span className="tooltip">{signOutTooltip}</span>}
        </Link>
        <Link
          to={"/profile"}
          className="profile-btn-photo"
          onMouseEnter={() => tooltip("Profile")}
          onMouseLeave={() => tooltip("")}
        >
          {activeUser?.profilePhoto ? (
            <img src={activeUser?.profilePhoto} alt="profile" />
          ) : (
            <div className="profile-photo-letter">
              {activeUser?.name?.slice(0, 1)?.toUpperCase()}
            </div>
          )}
          {profileTooltip && <span className="tooltip">{profileTooltip}</span>}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
