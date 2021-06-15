/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./index.scss";
import moment from "moment";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

// actions
import {
  resetData,
  getAllUsersInvestorApi,
} from "../../../../stores/reducers/userSlice";
import {
  updateProjectApi,
  getDetailProject,
  resetDataUnits,
  setDataUnits,
} from "../../../../stores/reducers/projectSlice";
import { getAllCitiesApi } from "../../../../stores/reducers/citySlice";

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
  CInputFile,
  CModal,
  CModalBody,
  CModalHeader,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CInputGroupPrepend,
} from "@coreui/react";

// components
import LoadingContainer from "../../../../components/clients/common/Loading";
import Units from "../Units";
import AddUnit from "../AddUnit";

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
  {
    value: "inprogress",
    label: "Inprogress",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "deleted",
    label: "Deleted",
  },
];

const EditProject = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const { citiesOfProjects } = useSelector((state) => state.cities);
  const { usersInvestor } = useSelector((state) => state.users);
  const {
    units,
    isUpdatedProject,
    error,
    loading,
    projectDetail,
  } = useSelector((state) => state.projects);

  // states
  const [modal, setModal] = useState(false);
  // const [dataUnits, setDataUnits] = useState([]);

  const validationSchema = yup.object({
    name: yup.string("Please enter name project").required("Name is required"),
    cityProject: yup.string().required("City of project is required"),
    status: yup.string().required("Status is required"),
    investmentDate: yup.date(),
    investmentAmount: yup.number(),
    estimatedReturn: yup.number(),
    totalRoi: yup.number(),
    anualRoi: yup.number(),
    area: yup.string(),
    street: yup.string(),
    cashReqForLotPurchase: yup.number(),
    loanForLotPurchase: yup.number(),
    totalBildingCost: yup.number(),
    lotPurchaseLoanFinCost: yup.number(),
    constructionFinCost: yup.number(),
    softCost: yup.number(),
    additionalRequiredEquity: yup.number(),
    totalCashReqForProject: yup.number(),
    avgSalePricePerSqf: yup.number(),
    totalExpectedIncome: yup.number(),
    salesCommissionPercent: yup.number(),
    profitPerProject: yup.number(),
    profitPerProjectPercent: yup.number(),
    constructorSharePercent: yup.number(),
    developerSharePercent: yup.number(),
    totalCashOnCash: yup.number(),
    netCashOnCash: yup.number(),
    projectPeriodMonth: yup.number(),
    annualReturn: yup.number(),
    units: yup.array(),
    flagDashboard: yup.boolean(),
    flagIndex: yup.number(),
    isShowHollywood: yup.boolean(),
    isSilverLake: yup.boolean(),
    userAssigned: yup.string(),
  });

  useEffect(() => {
    if (!projectDetail) {
      dispatch(getDetailProject(id));
    }
    return () => {
      dispatch(resetData());
      dispatch(resetDataUnits());
    };
  }, [dispatch]);

  useEffect(() => {
    if (projectDetail) {
      const data = projectDetail.units.concat(units);
      dispatch(setDataUnits(data));
      
    }
    
  }, [projectDetail, dispatch]);

  useEffect(() => {
    dispatch(getAllUsersInvestorApi());
    dispatch(getAllCitiesApi());
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isUpdatedProject) {
      toast.success("Updated project successfully");
      // resetForm();
      dispatch(resetData());
      history.push("/admin/projects");
    }
    return () => {
      dispatch(resetData());
    };
  }, [isUpdatedProject, dispatch, history]);

  useEffect(() => {
    if (error) {
      toast.error("Updated project failed");
      dispatch(resetData());
    }
    return () => {
      dispatch(resetData());
    };
  }, [dispatch, error]);

  const handleBack = () => {
    history.goBack();
  };


  const toggle = () => {
    setModal(!modal);
  };

  const handleChangeImages = (event, setFieldValue) => {
    const { name, files } = event.target;
    if (name === "picture") {
      setFieldValue(name, files[0]);
    } else {
      setFieldValue(name, files);
    }
  };

  const handleChangeRadio = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value === "true" ? true : false);
  };

  const handleChangeDate = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };

  return (
    <div className="addProject">
      {loading === false && projectDetail !== null ? (
        <Formik
          initialValues={{
            name: projectDetail.name || "",
            cityProject:
              (projectDetail.cityProject && projectDetail.cityProject._id) ||
              "",
            status: projectDetail.status || "",
            // picture: null,
            // gallery: null,
            investmentDate:
              moment(projectDetail.investmentDate).format("YYYY-MM-DD") ||
              "2021-07-08",
            investmentAmount: projectDetail.investmentAmount || 0,
            estimatedReturn: projectDetail.estimatedReturn || 0,
            totalRoi: projectDetail.totalRoi || 0,
            anualRoi: projectDetail.anualRoi || 0,
            area: projectDetail.area || "",
            street: projectDetail.street || "",
            cashReqForLotPurchase: projectDetail.cashReqForLotPurchase || 0,
            loanForLotPurchase: projectDetail.loanForLotPurchase || 0,
            totalBildingCost: projectDetail.totalBildingCost || 0,
            lotPurchaseLoanFinCost: projectDetail.lotPurchaseLoanFinCost || 0,
            constructionFinCost: projectDetail.constructionFinCost || 0,
            softCost: projectDetail.softCost || 0,
            additionalRequiredEquity:
              projectDetail.additionalRequiredEquity || 0,
            totalCashReqForProject: projectDetail.totalCashReqForProject || 0,
            avgSalePricePerSqf: projectDetail.avgSalePricePerSqf || 0,
            totalExpectedIncome: projectDetail.totalExpectedIncome || 0,
            salesCommissionPercent: projectDetail.salesCommissionPercent || 0,
            profitPerProject: projectDetail.profitPerProject || 0,
            profitPerProjectPercent: projectDetail.profitPerProjectPercent || 0,
            constructorSharePercent: projectDetail.constructorSharePercent || 0,
            developerSharePercent: projectDetail.developerSharePercent || 0,
            totalCashOnCash: projectDetail.totalCashOnCash || 0,
            netCashOnCash: projectDetail.netCashOnCash || 0,
            projectPeriodMonth: projectDetail.projectPeriodMonth || 0,
            annualReturn: projectDetail.annualReturn || 0,
            units: [],
            flagDashboard: projectDetail.flagDashboard || false,
            flagIndex: projectDetail.flagIndex || 1,
            isShowHollywood: projectDetail.isShowHollywood || false,
            isSilverLake: projectDetail.isSilverLake || false,
            userAssigned: projectDetail.userAssigned || null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            values.units = units;
            const fd = new FormData();

            for (var key in values) {
              if (key === "units") {
                fd.append(key, JSON.stringify(values[key]));
              } else if (key === "gallery") {
                for (let index = 0; index < values[key].length; index++) {
                  const file = values[key][index];
                  fd.append(key, file);
                }
              } else {
                fd.append(key, values[key]);
              }
            }

            console.log("values: ", values);

            await dispatch(updateProjectApi({ id, values: fd }));
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
            <CForm onSubmit={handleSubmit} method="post">
              <CCard>
                <CCardHeader>Edit Project</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={12}>
                      <h3 className="title" style={{ marginTop: 0 }}>
                        Main
                      </h3>
                    </CCol>
                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Name</CLabel>
                        <CInput
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                        {errors.name && touched.name && (
                          <CFormText className="help-block textError">
                            {errors.name}
                          </CFormText>
                        )}
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
                          <option value="null">Please select</option>
                          {statusOptions.map((el, i) => (
                            <option key={i} value={el.value}>
                              {el.label}
                            </option>
                          ))}
                        </CSelect>
                        {errors.status && touched.status && (
                          <CFormText className="help-block textError">
                            {errors.status}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>City</CLabel>
                        <CSelect
                          name="cityProject"
                          value={values.cityProject}
                          onChange={handleChange}
                        >
                          <option value="null">Please select</option>
                          {citiesOfProjects &&
                            citiesOfProjects.length > 0 &&
                            citiesOfProjects.map((el, i) => (
                              <option key={i} value={el._id}>
                                {el.city ? el.city : el.state}
                              </option>
                            ))}
                        </CSelect>
                        {errors.cityProject && touched.cityProject && (
                          <CFormText className="help-block textError">
                            {errors.cityProject}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={12}>
                      <h3 className="title">Photos</h3>
                    </CCol>

                    <CCol md={12}>
                      <CFormGroup>
                        <CLabel>Photo</CLabel>
                        <CInputFile
                          name="picture"
                          onChange={(event) =>
                            handleChangeImages(event, setFieldValue)
                          }
                          // value={values.picture}
                          multiple={false}
                        />
                      </CFormGroup>

                      {projectDetail && projectDetail.picture && (
                        <div className="viewImages">
                          <div className="imgItem" style={{ width: "25%" }}>
                            <img
                              style={{ width: "100%" }}
                              src={`${process.env.REACT_APP_CLOUD_FRONT_URI}${projectDetail.picture.key}`}
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                    </CCol>

                    <CCol md={12}>
                      <CFormGroup>
                        <CLabel>Gallery</CLabel>
                        <CInputFile
                          name="gallery"
                          // value={values.gallery}
                          onChange={(event) =>
                            handleChangeImages(event, setFieldValue)
                          }
                          multiple={true}
                        />
                      </CFormGroup>

                      {projectDetail && projectDetail.gallery && (
                        <div className="viewImages">
                          {projectDetail.gallery.length > 0 &&
                            projectDetail.gallery.map((item, i) => (
                              <div
                                className="imgItem"
                                key={i}
                                style={{
                                  width: `${
                                    100 / projectDetail.gallery.length
                                  }%`,
                                }}
                              >
                                <img
                                  style={{ width: "100%" }}
                                  src={`${process.env.REACT_APP_CLOUD_FRONT_URI}${item.key}`}
                                  alt=""
                                />
                              </div>
                            ))}
                        </div>
                      )}
                    </CCol>

                    {/* ============ investment info ============ */}
                    <CCol md={12}>
                      <h3 className="title">Investment Info</h3>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Investment date</CLabel>
                        <CInput
                          type="date"
                          name="invesmentData"
                          value={values.investmentDate}
                          onChange={(event) =>
                            handleChangeDate(event, setFieldValue)
                          }
                        />
                        {errors.investmentDate && touched.investmentDate && (
                          <CFormText className="help-block textError">
                            {errors.investmentDate}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Investment Amount</CLabel>

                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="investmentAmount"
                              value={values.investmentAmount}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {/* <CInput
                      type="number"
                      name="investmentAmount"
                      value={values.investmentAmount}
                      onChange={handleChange}
                    /> */}
                        {errors.investmentAmount &&
                          touched.investmentAmount && (
                            <CFormText className="help-block textError">
                              {errors.investmentAmount}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Investment Return</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="estimatedReturn"
                              value={values.estimatedReturn}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.estimatedReturn && touched.estimatedReturn && (
                          <CFormText className="help-block textError">
                            {errors.estimatedReturn}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Total ROI</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="totalRoi"
                              value={values.totalRoi}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.totalRoi && touched.totalRoi && (
                          <CFormText className="help-block textError">
                            {errors.totalRoi}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Anual ROI</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="anualRoi"
                              value={values.anualRoi}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.anualRoi && touched.anualRoi && (
                          <CFormText className="help-block textError">
                            {errors.anualRoi}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    {/* =========== Detail ============= */}
                    <CCol md={12}>
                      <h3 className="title">Detail Info</h3>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Area</CLabel>
                        <CInput
                          type="text"
                          name="area"
                          value={values.area}
                          onChange={handleChange}
                        />
                        {errors.area && touched.area && (
                          <CFormText className="help-block textError">
                            {errors.area}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Street</CLabel>
                        <CInput
                          type="text"
                          name="street"
                          value={values.street}
                          onChange={handleChange}
                        />
                        {errors.street && touched.street && (
                          <CFormText className="help-block textError">
                            {errors.street}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Cash Req For Lot Purchase</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="cashReqForLotPurchase"
                              value={values.cashReqForLotPurchase}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.cashReqForLotPurchase &&
                          touched.cashReqForLotPurchase && (
                            <CFormText className="help-block textError">
                              {errors.cashReqForLotPurchase}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Loan For Lot Purchase</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="loanForLotPurchase"
                              value={values.loanForLotPurchase}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.loanForLotPurchase &&
                          touched.loanForLotPurchase && (
                            <CFormText className="help-block textError">
                              {errors.loanForLotPurchase}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Total Bilding Cost</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="totalBildingCost"
                              value={values.totalBildingCost}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.totalBildingCost &&
                          touched.totalBildingCost && (
                            <CFormText className="help-block textError">
                              {errors.totalBildingCost}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Lot Purchase Loan Fin Cost</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="lotPurchaseLoanFinCost"
                              value={values.lotPurchaseLoanFinCost}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.lotPurchaseLoanFinCost &&
                          touched.lotPurchaseLoanFinCost && (
                            <CFormText className="help-block textError">
                              {errors.lotPurchaseLoanFinCost}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Construction Fin Cost</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="constructionFinCost"
                              value={values.constructionFinCost}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.constructionFinCost &&
                          touched.constructionFinCost && (
                            <CFormText className="help-block textError">
                              {errors.constructionFinCost}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Soft Cost</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="softCost"
                              value={values.softCost}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.softCost && touched.softCost && (
                          <CFormText className="help-block textError">
                            {errors.softCost}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Additional Required Equity</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="additionalRequiredEquity"
                              value={values.additionalRequiredEquity}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.additionalRequiredEquity &&
                          touched.additionalRequiredEquity && (
                            <CFormText className="help-block textError">
                              {errors.additionalRequiredEquity}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Total Cash Req For Project</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="totalCashReqForProject"
                              value={values.totalCashReqForProject}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.totalCashReqForProject &&
                          touched.totalCashReqForProject && (
                            <CFormText className="help-block textError">
                              {errors.totalCashReqForProject}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Avg Sale Price Per Sqf</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="avgSalePricePerSqf"
                              value={values.avgSalePricePerSqf}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.avgSalePricePerSqf &&
                          touched.avgSalePricePerSqf && (
                            <CFormText className="help-block textError">
                              {errors.avgSalePricePerSqf}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Total Expected Income</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="totalExpectedIncome"
                              value={values.totalExpectedIncome}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.totalExpectedIncome &&
                          touched.totalExpectedIncome && (
                            <CFormText className="help-block textError">
                              {errors.totalExpectedIncome}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Sales Commission Percent</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>%</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="salesCommissionPercent"
                              value={values.salesCommissionPercent}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.salesCommissionPercent &&
                          touched.salesCommissionPercent && (
                            <CFormText className="help-block textError">
                              {errors.salesCommissionPercent}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Profit Per Project</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="profitPerProject"
                              value={values.profitPerProject}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.profitPerProject &&
                          touched.profitPerProject && (
                            <CFormText className="help-block textError">
                              {errors.profitPerProject}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Profit Per Project Percent</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>%</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="profitPerProjectPercent"
                              value={values.profitPerProjectPercent}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.profitPerProjectPercent &&
                          touched.profitPerProjectPercent && (
                            <CFormText className="help-block textError">
                              {errors.profitPerProjectPercent}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Constructor Share Percent</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>%</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="constructorSharePercent"
                              value={values.constructorSharePercent}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.constructorSharePercent &&
                          touched.constructorSharePercent && (
                            <CFormText className="help-block textError">
                              {errors.constructorSharePercent}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Developer Share Percent</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>%</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="developerSharePercent"
                              value={values.developerSharePercent}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.developerSharePercent &&
                          touched.developerSharePercent && (
                            <CFormText className="help-block textError">
                              {errors.developerSharePercent}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Total Cash On Cash</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="totalCashOnCash"
                              value={values.totalCashOnCash}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.totalCashOnCash && touched.totalCashOnCash && (
                          <CFormText className="help-block textError">
                            {errors.totalCashOnCash}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Net Cash On Cash</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="netCashOnCash"
                              value={values.netCashOnCash}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.netCashOnCash && touched.netCashOnCash && (
                          <CFormText className="help-block textError">
                            {errors.netCashOnCash}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Project Period Month</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="projectPeriodMonth"
                              value={values.projectPeriodMonth}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.projectPeriodMonth &&
                          touched.projectPeriodMonth && (
                            <CFormText className="help-block textError">
                              {errors.projectPeriodMonth}
                            </CFormText>
                          )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Annual Return</CLabel>
                        <div className="controls">
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>$</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="number"
                              name="annualReturn"
                              value={values.annualReturn}
                              onChange={handleChange}
                            />
                            <CInputGroupAppend>
                              <CInputGroupText>.00</CInputGroupText>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </div>

                        {errors.annualReturn && touched.annualReturn && (
                          <CFormText className="help-block textError">
                            {errors.annualReturn}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    {/* =========== Other ============= */}
                    <CCol md={12}>
                      <h3 className="title">Permision Info</h3>
                    </CCol>

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>User assigned</CLabel>

                        <CSelect
                          name="userAssigned"
                          value={values.userAssigned}
                          onChange={handleChange}
                        >
                          <option>Please select user</option>
                          {usersInvestor &&
                            usersInvestor.length > 0 &&
                            usersInvestor.map((item, i) => (
                              <option key={i} value={item._id}>
                                {item.firstName} {item.lastName}
                              </option>
                            ))}
                        </CSelect>

                        {errors.userAssigned && touched.userAssigned && (
                          <CFormText className="help-block textError">
                            {errors.userAssigned}
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                    <CCol md={6} />

                    <CCol md={6}>
                      <CFormGroup>
                        <CLabel>Show on Dashboard</CLabel>
                        <div className="customRadioGroup">
                          <input
                            type="radio"
                            name="flagDashboard"
                            onChange={(event) =>
                              handleChangeRadio(event, setFieldValue)
                            }
                            value={true}
                            defaultChecked={values.flagDashboard === true}
                          />
                          <CLabel htmlFor="inline-radio1">Yes</CLabel>

                          <input
                            type="radio"
                            name="flagDashboard"
                            onChange={(event) =>
                              handleChangeRadio(event, setFieldValue)
                            }
                            value={false}
                            defaultChecked={values.flagDashboard === false}
                          />
                          <CLabel htmlFor="inline-radio1">No</CLabel>
                        </div>
                      </CFormGroup>
                    </CCol>

                    <CCol md={6}>
                      {values.flagDashboard === true && (
                        <CFormGroup>
                          <CLabel>Index Dashboard</CLabel>
                          <CInput
                            type="Number"
                            name="flagIndex"
                            value={values.flagIndex}
                            onChange={handleChange}
                          />
                          {errors.flagIndex && touched.flagIndex && (
                            <CFormText className="help-block textError">
                              {errors.flagIndex}
                            </CFormText>
                          )}
                        </CFormGroup>
                      )}
                    </CCol>

                    {/* =========== Other ============= */}
                    <CCol md={12}>
                      <h3 className="title">
                        Units Info
                        <CButton
                          size="sm"
                          className="btnNewUnit"
                          color="success"
                          onClick={toggle}
                        >
                          New Unit
                        </CButton>
                      </h3>
                    </CCol>

                    <CCol md={12}>
                      <Units data={units} />
                    </CCol>

                    {/* ======== actions form ========= */}
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

      <CModal show={modal} onClose={toggle} centered>
        <CModalHeader closeButton>Create Unit</CModalHeader>
        <CModalBody>
          <AddUnit onClose={toggle} />
        </CModalBody>
      </CModal>
    </div>
  );
};

export default EditProject;
