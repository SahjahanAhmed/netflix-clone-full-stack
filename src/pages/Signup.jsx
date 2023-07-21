import React, { useState } from "react";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { auth, db } from "../config/firebase";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "./signup.css";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // getting users from database
  const users = useSelector((store) => store.users);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") return;

    // cheak if the user already have an account with this email
    const matchedUser = users?.filter((user) => user.email == email);
    if (matchedUser.length > 0) {
      alertUser("This email already have an account with it!", "red");
      return;
    }

    // validate the email
    if (!email.includes("@") && !email.includes(".com")) {
      alertUser("please enter a valid email!", "red");
      return;
    }

    // validate the password
    if (password.length < 6) {
      alertUser("Too short password, put alteast 6 letters", "red");
      return;
    }

    // create account
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "users"), {
      name: name,
      email: user?.user?.email,
      profilePhoto: user?.user?.photoURL,
      uid: user?.user?.uid,
      saved: [],
    });
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
    <div className="sign-up">
      <div className="form-wrapper">
        <h1 className="sign-up-header">Sign up</h1>
        <form action="" className="sign-up-form" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Write your name here..."
              autoComplete="off"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button type="submit" className="sign-up-btn">
            Sign up
          </button>

          <div>
            Already have an acount? <Link to={"/sign-in"}>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
