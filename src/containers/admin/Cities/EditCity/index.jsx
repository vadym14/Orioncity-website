import React, { useEffect, useState } from "react";
import "./index.scss";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import csc from "country-state-city";

// actions
import {
  getDetailCityApi,
  updateDetailCityapi,
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

const EditCity = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cityDetail, error, loading, isUpdatedCity } = useSelector(
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

  useEffect(() => {
    if (!cityDetail) {
      dispatch(getDetailCityApi(id));
    }
    if (cityDetail && cityDetail.country) {
      const data = csc.getStatesOfCountry(cityDetail.country);
      setDataStates(data);
    }
    if (cityDetail && cityDetail.state) {
      const data = csc.getCitiesOfState(cityDetail.country, cityDetail.state);
      setDataCities(data);
    }

    if (cityDetail && cityDetail.description) {
      setHtmlEditor(cityDetail.description);
    }
  }, [id, dispatch, cityDetail]);

  useEffect(() => {
    if (isUpdatedCity) {
      toast.success("Updated city successfully");
      dispatch(resetData());
      history.goBack();
    }
    return () => {
      dispatch(resetData());
    };
  }, [isUpdatedCity, dispatch, history]);

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

  const handleChangeCountry = async (event, setFieldValue) => {
    const { name, value } = event.target;
    setCountryCode(value);
    const states = await csc.getStatesOfCountry(value);
    setFieldValue(name, value);
    if (states) {
      setDataStates(states);
    }
  };

  const handleChangeState = async (event, setFieldValue) => {
    const { name, value } = event.target;
    const cities = await csc.getCitiesOfState(countryCode, value);
    setFieldValue(name, value);
    if (cities) {
      setDataCities(cities);
    }
  };

  const handleChangeEditor = (
    content,
    delta,
    source,
    editor,
    setFieldValue
  ) => {
    setHtmlEditor(content);
    setFieldValue("description", content);
  };

  return (
    <div className="addUser">
      {loading === false && cityDetail !== null ? (
        <Formik
          initialValues={{
            city: cityDetail.city || "",
            state: cityDetail.state || "",
            country: cityDetail.country || "",
            description: cityDetail.description || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log("values: ", values);
            await dispatch(updateDetailCityapi({ id, values }));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <CForm onSubmit={handleSubmit} method="put">
              <CCard>
                <CCardHeader>Edit City</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Country</CLabel>
                        <CSelect
                          name="country"
                          value={values.country}
                          onChange={(event) =>
                            handleChangeCountry(event, setFieldValue)
                          }
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
                        {errors.country && touched.country && (
                          <CFormText className="help-block textError">
                            {errors.country}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>State</CLabel>
                        <CSelect
                          name="state"
                          value={values.state}
                          onChange={(event) =>
                            handleChangeState(event, setFieldValue)
                          }
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
                        {errors.state && touched.state && (
                          <CFormText className="help-block textError">
                            {errors.state}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>City</CLabel>
                        <CSelect
                          name="city"
                          value={values.city}
                          onChange={(event) =>
                            handleChange(event, setFieldValue)
                          }
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
                        {errors.city && touched.city && (
                          <CFormText className="help-block textError">
                            {errors.city}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={12}>
                      <CFormGroup>
                        <CLabel>Description</CLabel>

                        <MyEditor
                          onChange={(content, delta, source, editor) =>
                            handleChangeEditor(
                              content,
                              delta,
                              source,
                              editor,
                              setFieldValue
                            )
                          }
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

export default EditCity;
