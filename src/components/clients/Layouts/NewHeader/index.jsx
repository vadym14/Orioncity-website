import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";

import {
  CNavbar,
  CToggler,
  CNavbarBrand,
  CCollapse,
  CNavbarNav,
} from "@coreui/react";

import LogoPage from "../../../../assets/icons/logo-dark.svg";

const NewHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`newHeader ${props.isFixed ? "isFixed" : ""}`}>
      {/* <CContainer> */}
      <CNavbar expandable="md" color="light" className=" navbar-light ">
        <CToggler
          className="navMobile"
          color="white"
          inNavbar
          onClick={() => setIsOpen(!isOpen)}
        />
        <CNavbarBrand>
          <Link to="/" className="logoPage">
            <img src={LogoPage} alt="" />
          </Link>
        </CNavbarBrand>
        <CCollapse show={isOpen} navbar>
          <CNavbarNav className="ml-auto"></CNavbarNav>
          <CNavbarNav className="ml-auto rightMenu">
            <Link to="/projects">Projects</Link>
            <Link to="/bio">Bio</Link>
            <Link to="/dashboard">Account</Link>
          </CNavbarNav>
        </CCollapse>
      </CNavbar>
      {/* </CContainer> */}
    </div>
  );
};

export default NewHeader;
