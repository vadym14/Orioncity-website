import React from "react";
import "./index.scss";
// import { Link } from "react-router-dom";

// import { FaTimes } from "react-icons/fa";
import {
  CContainer,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
} from "@coreui/react";

const ClientForgotPassword = (props) => {
  return (
    <div className="loginPage">
      {/* <Link to="/" className="btnClose">
        <FaTimes />
      </Link> */}

      <CContainer>
        <div className="content">
          <CForm action="" method="post">
            <h1>Create New Password</h1>
            <h4>Please enter your email address</h4>

            <CFormGroup>
              <CLabel htmlFor="nf-email">Email</CLabel>
              <CInput
                type="email"
                id="nf-email"
                name="nf-email"
                autoComplete="email"
              />
            </CFormGroup>

            <div className="actions" style={{ marginTop: 30 }}>
              <CButton color="primary" classID="btnLogin">
                Create Password
              </CButton>
            </div>
          </CForm>
        </div>
      </CContainer>
    </div>
  );
};

export default ClientForgotPassword;
