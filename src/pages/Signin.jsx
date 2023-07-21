import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // getting users from database
  const users = useSelector((store) => store.users);

  // handle sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") return;

    // cheak if the user don't have an account with this email
    const matchedUser = users?.filter((user) => user.email == email);
    if (matchedUser.length === 0) {
      alertUser("This email don't have an account with it!", "red");
      return;
    }
    // validate the email
    if (!email.includes("@") && !email.includes(".com")) {
      alertUser("please enter a valid email!", "red");
      return;
    }

    // if password and email don't match
    if (matchedUser && matchedUser[0].password !== password) {
      alertUser("wrong password!", "red");
      return;
    }

    // validate the password
    if (password.length < 6) {
      alertUser("Too short password, put alteast 6 letters", "red");
      return;
    }

    // sign in
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    localStorage.setItem("active", true);
    window.location.reload();
  };

  // alert user, if anything wrong
  const alertUser = (alertText, bg) => {
    Toastify({
      text: alertText,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background:
          bg == "red"
            ? "linear-gradient(to right, red, orange)"
            : "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  };

  return (
    <div className="sign-in">
      <div className="form-wrapper">
        <h1 className="sign-in-header">Sign in</h1>
        <form action="" className="sign-in-form" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Write your email here"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-field-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password is here..."
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="show-password-btn"
              type="button"
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <button type="submit" className="sign-in-btn">
            Sign in
          </button>

          <div>
            Don't have an account? <Link to={"/sign-up"}>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
