/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./index.scss";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";

// actions
import { loginUserApi, resetData } from "../../../stores/reducers/authSlice";
// ui
import {
  CContainer,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CFormText,
} from "@coreui/react";
// components
import LoadingContainer from "../../../components/clients/common/Loading";

const ClientLogin = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(async () => {
    if (selector.isLogined === true && selector.user) {
      await toast.success("Login successfully!");
      if (selector.user.role === "admin") {
        await history.push("/admin");
      } else {
        await history.push("/dashboard");
      }
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
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values: ", values);
      dispatch(loginUserApi(values));
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
              <h1>Log In</h1>
              <h4>
                New to this site?<Link to="/register">Sign Up</Link>
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

              <Link className="forgotPassword" to="/forgot-password">
                Forgot password?
              </Link>

              <div className="actions">
                <CButton type="submit" color="primary" classID="btnLogin">
                  Log In
                </CButton>
              </div>
            </CForm>
          </div>
        </CContainer>
      )}
    </div>
  );
};

export default ClientLogin;
