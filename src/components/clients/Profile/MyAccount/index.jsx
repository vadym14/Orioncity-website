import React, { useEffect } from "react";
import "./index.scss";

import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";

// actions
import { updateProfileInfoApi } from "../../../../stores/reducers/userSlice";

// components
import LoadingContainer from "../../common/Loading";

import { BsInfoCircle } from "react-icons/bs";
import {
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CForm,
  CFormGroup,
  CFormText,
  CLabel,
  CInput,
  CButton,
  CPopover,
  CRow,
  CCol,
} from "@coreui/react";

const MyAccount = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.users);

  useEffect(() => {
    if (selector.isUpdatedInfo && selector.user) {
      toast.success("Updated info successfully!");
    } else if (selector.error) {
      console.log("selector.error: ", selector.error);
      toast.error(selector.error);
    }
  }, [selector]);

  const validationSchema = yup.object({
    firstName: yup
      .string("Please enter your first name")
      .required("First name is required"),
    lastName: yup
      .string("Please enter your last name")
      .required("Last name is required"),
    phone: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: (selector.user && selector.user.firstName) || "",
      lastName: (selector.user && selector.user.lastName) || "",
      phone: (selector.user && selector.user.phone) || "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateProfileInfoApi(values));
    },
  });

  return (
    <div className="myAccount">
      {selector.loading ? (
        <LoadingContainer />
      ) : (
        <CTabs activeTab="myAccount">
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="myAccount">My Account</CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane data-tab="myAccount">
              <h2>My Account</h2>
              <p className="description">
                View and edit your personal info below.
              </p>

              <CForm onSubmit={formik.handleSubmit}>
                <CFormGroup>
                  <CLabel>Login Email:</CLabel>
                  <div className="viewText">
                    <p>
                      {(selector.user && selector.user.email) || "No email"}
                    </p>

                    <CPopover content="You login email can't be changed.">
                      <BsInfoCircle />
                    </CPopover>
                  </div>
                </CFormGroup>

                <CRow>
                  <CCol md={6}>
                    <CFormGroup>
                      <CLabel>First Name</CLabel>
                      <CInput
                        placeholder="e.g, Kate"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.firstName && formik.touched.firstName && (
                        <CFormText className="help-block textError">
                          {formik.errors.firstName}
                        </CFormText>
                      )}
                    </CFormGroup>
                  </CCol>

                  <CCol md={6}>
                    <CFormGroup>
                      <CLabel>Last Name</CLabel>
                      <CInput
                        placeholder="e.g, Sims"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.lastName && formik.touched.lastName && (
                        <CFormText className="help-block textError">
                          {formik.errors.lastName}
                        </CFormText>
                      )}
                    </CFormGroup>
                  </CCol>

                  <CCol md={6}>
                    <CFormGroup>
                      <CLabel>Contact Email</CLabel>
                      <CInput
                        placeholder="ex@gmail.com"
                        name="email"
                        defaultValue={
                          (selector.user && selector.user.email) || ""
                        }
                        readOnly
                        // value={formik.values.email}
                      />
                      <CFormText className="help-block">
                        This is the email we’ll use to contact you.
                      </CFormText>
                    </CFormGroup>
                  </CCol>

                  <CCol md={6}>
                    <CFormGroup>
                      <CLabel>Phone</CLabel>
                      <CInput
                        placeholder="e.g, +1 415-639-9034"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <CFormText className="help-block textError">
                          {formik.errors.phone}
                        </CFormText>
                      )}
                    </CFormGroup>
                  </CCol>

                  <CCol md={6}>
                    <CButton
                      type="submit"
                      color="light"
                      shape="square"
                      className="btnUpdate"
                    >
                      Update Info
                    </CButton>
                  </CCol>
                  <CCol md={6}>
                    <CButton color="link" shape="square" className="btnCancel">
                      Cancel
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default MyAccount;
