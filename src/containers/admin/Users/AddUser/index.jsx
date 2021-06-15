import React, { useEffect } from "react";
import "./index.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

// actions
import {
  createUserApi,
  resetData,
} from "../../../../stores/reducers/userSlice";

import {
  CForm,
  CFormGroup,
  CFormText,
  CLabel,
  CInput,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CSelect,
} from "@coreui/react";

// components
import LoadingContainer from "../../../../components/clients/common/Loading";

const statusOptions = [
  {
    value: "inactive",
    label: "Inactive",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "blocked",
    label: "Blocked",
  },
];

const roleOptions = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "investor",
    label: "Investor",
  },
];

const AddUser = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isCreatedUser, error, loading } = useSelector((state) => state.users);

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Email invalid")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .required("Password is required"),
    phone: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
      firstName: "",
      lastName: "",
      status: statusOptions[0].value,
      role: roleOptions[1].value,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("values: ", values);
      await dispatch(createUserApi(values));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isCreatedUser) {
      toast.success("Created user successfully");
      formik.resetForm();
      dispatch(resetData());
      history.goBack();
    }
    return () => {
      dispatch(resetData());
    };
  }, [isCreatedUser, dispatch, formik, history]);

  useEffect(() => {
    if (error) {
      toast.error("Created user failed");
      dispatch(resetData());
    }
    return () => {
      dispatch(resetData());
    };
  }, [dispatch, error]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="addUser">
      <CForm onSubmit={formik.handleSubmit} method="post">
        {loading ? (
          <LoadingContainer />
        ) : (
          <CCard>
            <CCardHeader>Add User</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Email</CLabel>
                    <CInput
                      type="emai"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <CFormText className="help-block textError">
                        {formik.errors.email}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Password</CLabel>
                    <CInput
                      type="text"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <CFormText className="help-block textError">
                        {formik.errors.password}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>First Name</CLabel>
                    <CInput
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                    />
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Last Name</CLabel>
                    <CInput
                      type="text"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Phone</CLabel>
                    <CInput
                      type="text"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Status</CLabel>
                    <CSelect
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                    >
                      {statusOptions.map((el, i) => (
                        <option key={i} value={el.value}>
                          {el.label}
                        </option>
                      ))}
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Role</CLabel>
                    <CSelect
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                    >
                      {roleOptions.map((el, i) => (
                        <option key={i} value={el.value}>
                          {el.label}
                        </option>
                      ))}
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol md={12}>
                  <div className="actions">
                    <CButton color="danger" onClick={handleBack}>
                      Back
                    </CButton>
                    <CButton type="submit" color="success">
                      Add
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        )}
      </CForm>
    </div>
  );
};

export default AddUser;
