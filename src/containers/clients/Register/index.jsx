/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./index.scss";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { registerUserApi, resetData } from "../../../stores/reducers/authSlice";

import {
  CContainer,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CFormText,
} from "@coreui/react";

import LoadingContainer from "../../../components/clients/common/Loading";

const ClientRegister = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(async () => {
    if (selector.isCreated === true && selector.user) {
      await toast.success("Register account successfully!");
      await history.push("/login");
    } else if (selector.error) {
      toast.error(selector.error.message);
    }
  }, [selector, history, dispatch]);

  const validationSchema = yup.object({
    email: yup
      .string("Please enter your email.")
      .email("Invalid email format.")
      .required("Email is required"),
    password: yup
      .string("Please enter your password")
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    rePassword: yup
      .string("Please enter confirm password")
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password is not match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values: ", values);
      dispatch(registerUserApi(values));
    },
  });

  return (
    <div className="loginPage">
      {selector.loading ? (
        <LoadingContainer />
      ) : (
        <CContainer>
          <div className="content">
            <CForm onSubmit={formik.handleSubmit} method="post">
              <h1>Sign Up</h1>
              <h4>
                Already a member? <Link to="/login">Log In</Link>
              </h4>

              <CFormGroup>
                <CLabel htmlFor="nf-email">Email</CLabel>
                <CInput
                  type="email"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />

                {formik.errors.email && formik.touched.email && (
                  <CFormText className="help-block textError">
                    {formik.errors.email}
                  </CFormText>
                )}
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-email">Password</CLabel>
                <CInput
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <CFormText className="help-block textError">
                    {formik.errors.password}
                  </CFormText>
                )}
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-email">Confirm Password</CLabel>
                <CInput
                  type="password"
                  name="rePassword"
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <CFormText className="help-block textError">
                    {formik.errors.rePassword}
                  </CFormText>
                )}
              </CFormGroup>

              <div className="actions" style={{ marginTop: 30 }}>
                <CButton type="submit" color="primary" classID="btnLogin">
                  Sign Up
                </CButton>
              </div>
            </CForm>
          </div>
        </CContainer>
      )}
    </div>
  );
};

export default ClientRegister;
