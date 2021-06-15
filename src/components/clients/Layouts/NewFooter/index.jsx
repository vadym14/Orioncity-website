/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./index.scss";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const NewFooter = (props) => {
  return (
    <div className="newFooter">
      <ul>
        <li>Copyright © 2021</li>
        <li>All rights reserved</li>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
      </ul>
      <div className="socials">
        <a href="#">
          <FaLinkedinIn />
        </a>
        <a href="#">
          <FaFacebookF />
        </a>
        <a href="#">
          <FaTwitter />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default NewFooter;
