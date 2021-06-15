import React, { useEffect } from "react";
import "./index.scss";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

// actions
import {
  resetData,
  getUserDetailApi,
  updateUserApi,
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

const EditUser = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isUpdatedUserDetail, error, loading, userDetail } = useSelector(
    (state) => state.users
  );

  console.log('isUpdatedUserDetail: ', isUpdatedUserDetail)

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Email invalid")
      .required("Email is required"),
    password: yup.string(""),
    phone: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
  });

  useEffect(() => {
    if (!userDetail) {
      dispatch(getUserDetailApi(id));
    }
    // return () => {
    //   dispatch(resetData());
    // };
  }, [id, dispatch, userDetail]);

  useEffect(() => {
    if (isUpdatedUserDetail) {
      toast.success("Updated user successfully");
      // formik resetForm();
      dispatch(resetData());
      history.goBack();
    }
    return () => {
      dispatch(resetData());
    };
  }, [isUpdatedUserDetail, dispatch, history]);

  useEffect(() => {
    if (error) {
      toast.error(error.data);
      dispatch(resetData());
    }
    return () => {
      dispatch(resetData());
    };
  }, [dispatch, error]);

  const handleBack = () => {
    history.goBack();
  };

  // const onSubmitData = (values) => {
  //   dispatch(updateUserApi({ id, values }));
  // };

  return (
    <div className="addUser">
      {loading === false && userDetail !== null ? (
        <Formik
          initialValues={{
            email: userDetail.email || "",
            password: "",
            phone: userDetail.phone || "",
            firstName: userDetail.firstName || "",
            lastName: userDetail.lastName || "",
            status: userDetail.status || "",
            role: userDetail.role || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            // onSubmitData(values);

            await dispatch(updateUserApi({ id, values }));
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <CForm onSubmit={handleSubmit} method="put">
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
                          value={values.email}
                          onChange={handleChange}
                        />
                        {errors.email && touched.email && (
                          <CFormText className="help-block textError">
                            {errors.email}
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
                          value={values.password}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password && (
                          <CFormText className="help-block textError">
                            {errors.password}
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
                          value={values.firstName}
                          onChange={handleChange}
                        />
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Last Name</CLabel>
                        <CInput
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                        />
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Phone</CLabel>
                        <CInput
                          type="text"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                        />
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Status</CLabel>
                        <CSelect
                          name="status"
                          value={values.status}
                          onChange={handleChange}
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
                          value={values.role}
                          onChange={handleChange}
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
                          Save
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CForm>
          )}
        </Formik>
      ) : (
        <LoadingContainer />
      )}
    </div>
  );
};

export default EditUser;
