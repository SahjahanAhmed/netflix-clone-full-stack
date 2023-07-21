import React from "react";

import { BsLinkedin, BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";

import "./credit.css";
const Credit = () => {
  return (
    <div className="credit-div">
      <div>
        Developed by{" "}
        <a href="https://github.com/SahjahanAhmed">Sahjahan Ahmed</a>
      </div>

      <div className="icons">
        <a href="https://www.linkedin.com/in/sahjahan-ahmed/">
          <BsLinkedin />
        </a>
        <a href="https://web.facebook.com/bd.square.18/">
          <BsFacebook />
        </a>
        <a href="https://github.com/SahjahanAhmed">
          <BsGithub />
        </a>
        <a href="https://www.instagram.com/sahjahan_ahmed12/">
          <BsInstagram />
        </a>
      </div>
    </div>
  );
};

export default Credit;
