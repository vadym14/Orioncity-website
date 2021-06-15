import React, { useEffect, useState } from "react";
import "./index.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import csc from "country-state-city";

// actions
import {
  createCityApi,
  resetData,
} from "../../../../stores/reducers/citySlice";

import {
  CForm,
  CFormGroup,
  CFormText,
  CLabel,
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
import MyEditor from "../../../../components/clients/common/MyEditor";


const AddCity = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isCreatedCity, error, loading } = useSelector(
    (state) => state.cities
  );

  const [dataStates, setDataStates] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [countryCode, setCountryCode] = useState(null);
  const [htmlEditor, setHtmlEditor] = useState("");

  const allCountries = csc.getAllCountries();

  const validationSchema = yup.object({
    country: yup.string().required("Country is required"),
    state: yup.string("").required("State is required"),
    city: yup.string(),
    description: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      country: "",
      state: "",
      city: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("values: ", values);
      await dispatch(createCityApi(values));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isCreatedCity) {
      toast.success("Created user successfully");
      formik.resetForm();
      dispatch(resetData());
      history.goBack();
    }
    return () => {
      dispatch(resetData());
    };
  }, [isCreatedCity, dispatch, formik, history]);

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

  const handleChangeCountry = async (event) => {
    const { name, value } = event.target;
    setCountryCode(value);
    const states = await csc.getStatesOfCountry(value);
    formik.setFieldValue(name, value);
    if (states) {
      setDataStates(states);
    }
  };

  const handleChangeState = async (event) => {
    const { name, value } = event.target;
    const cities = await csc.getCitiesOfState(countryCode, value);
    formik.setFieldValue(name, value);
    if (cities) {
      setDataCities(cities);
    }
  };

  const handleChangeEditor = (content, delta, source, editor) => {
    setHtmlEditor(content);
    formik.setFieldValue("description", content);
  };

  return (
    <div className="addUser">
      <CForm onSubmit={formik.handleSubmit} method="post">
        {loading ? (
          <LoadingContainer />
        ) : (
          <CCard>
            <CCardHeader>Add City</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Country</CLabel>
                    <CSelect
                      name="country"
                      value={formik.values.country}
                      onChange={handleChangeCountry}
                    >
                      <option value="null">Please select</option>
                      {allCountries &&
                        allCountries.length > 0 &&
                        allCountries.map((el, i) => (
                          <option key={i} value={el.isoCode}>
                            {el.name}
                          </option>
                        ))}
                    </CSelect>
                    {formik.errors.country && formik.touched.country && (
                      <CFormText className="help-block textError">
                        {formik.errors.country}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>State</CLabel>
                    <CSelect
                      name="state"
                      value={formik.values.state}
                      onChange={handleChangeState}
                    >
                      <option value="null">Please select</option>
                      {dataStates &&
                        dataStates.length > 0 &&
                        dataStates.map((el, i) => (
                          <option key={i} value={el.isoCode}>
                            {el.name}
                          </option>
                        ))}
                    </CSelect>
                    {formik.errors.state && formik.touched.state && (
                      <CFormText className="help-block textError">
                        {formik.errors.state}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>City</CLabel>
                    <CSelect
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                    >
                      <option value="null">Please select</option>
                      {dataCities &&
                        dataCities.length > 0 &&
                        dataCities.map((el, i) => (
                          <option key={i} value={el.name}>
                            {el.name}
                          </option>
                        ))}
                    </CSelect>
                    {formik.errors.city && formik.touched.city && (
                      <CFormText className="help-block textError">
                        {formik.errors.city}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>

                <CCol md={12}>
                  <CFormGroup>
                    <CLabel>Description</CLabel>

                    <MyEditor
                      onChange={handleChangeEditor}
                      value={htmlEditor}
                    />
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

export default AddCity;
