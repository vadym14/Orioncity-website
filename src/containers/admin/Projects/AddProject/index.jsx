import React, { useEffect, useState } from "react";
import "./index.scss";
import moment from "moment";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

// actions
import {
  resetData,
  getAllUsersInvestorApi,
} from "../../../../stores/reducers/userSlice";
import {
  createProjectApi,
  resetDataUnits,
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
  CInputGroupPrepend,
  CInputGroupText,
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
];

const AddProject = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // selector
  const { citiesOfProjects } = useSelector((state) => state.cities);
  const { usersInvestor } = useSelector((state) => state.users);
  const { units, isCreatedProject, error, loading } = useSelector(
    (state) => state.projects
  );

  // state
  const [modal, setModal] = useState(false);

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
    userAssigned: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      cityProject: "",
      status: "",
      // picture: null,
      // gallery: null,
      investmentDate: moment().format("YYYY-MM-DD"),
      investmentAmount: 0,
      estimatedReturn: 0,
      totalRoi: 0,
      anualRoi: 0,
      area: "",
      street: "",
      cashReqForLotPurchase: 0,
      loanForLotPurchase: 0,
      totalBildingCost: 0,
      lotPurchaseLoanFinCost: 0,
      constructionFinCost: 0,
      softCost: 0,
      additionalRequiredEquity: 0,
      totalCashReqForProject: 0,
      avgSalePricePerSqf: 0,
      totalExpectedIncome: 0,
      salesCommissionPercent: 0,
      profitPerProject: 0,
      profitPerProjectPercent: 0,
      constructorSharePercent: 0,
      developerSharePercent: 0,
      totalCashOnCash: 0,
      netCashOnCash: 0,
      projectPeriodMonth: 0,
      annualReturn: 0,
      units: [],
      flagDashboard: false,
      flagIndex: 1,
    },
    validationSchema,
    onSubmit: async (values) => {
      values.units = units;
      console.log("values: ", values);
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
      await dispatch(createProjectApi(fd));
    },
  });

  useEffect(() => {
    dispatch(resetData());
    dispatch(getAllUsersInvestorApi());
    dispatch(getAllCitiesApi());

    return () => {
      dispatch(resetData());
      dispatch(resetDataUnits());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isCreatedProject) {
      toast.success("Created project successfully");
      formik.resetForm();
      dispatch(resetData());
      history.push("/admin/projects");
    }
    return () => {
      dispatch(resetData());
    };
  }, [isCreatedProject, dispatch, formik, history]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
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

  const handleChangeImages = (event) => {
    const { name, files } = event.target;
    if (name === "picture") {
      formik.setFieldValue(name, files[0]);
    } else {
      formik.setFieldValue(name, files);
    }
  };

  const handleChangeRadio = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value === "true" ? true : false);
  };

  return (
    <div className="addProject">
      <CForm onSubmit={formik.handleSubmit} method="post">
        {loading ? (
          <LoadingContainer />
        ) : (
          <CCard>
            <CCardHeader>Add Project</CCardHeader>
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
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <CFormText className="help-block textError">
                        {formik.errors.name}
                      </CFormText>
                    )}
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
                      <option value="null">Please select</option>
                      {statusOptions.map((el, i) => (
                        <option key={i} value={el.value}>
                          {el.label}
                        </option>
                      ))}
                    </CSelect>
                    {formik.errors.status && formik.touched.status && (
                      <CFormText className="help-block textError">
                        {formik.errors.status}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>City</CLabel>
                    <CSelect
                      name="cityProject"
                      value={formik.values.cityProject}
                      onChange={formik.handleChange}
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
                    {formik.errors.cityProject &&
                      formik.touched.cityProject && (
                        <CFormText className="help-block textError">
                          {formik.errors.cityProject}
                        </CFormText>
                      )}
                  </CFormGroup>
                </CCol>

                <CCol md={12}>
                  <h3 className="title">Photos</h3>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Photo</CLabel>
                    <CInputFile
                      name="picture"
                      onChange={handleChangeImages}
                      // value={formik.values.picture}
                      multiple={false}
                    />
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Gallery</CLabel>
                    <CInputFile
                      name="gallery"
                      // value={formik.values.gallery}
                      onChange={handleChangeImages}
                      multiple={true}
                    />
                  </CFormGroup>
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
                      name="investmentDate"
                      // defaultValue='2021-04-06'
                      value={formik.values.investmentDate}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.investmentDate &&
                      formik.touched.investmentDate && (
                        <CFormText className="help-block textError">
                          {formik.errors.investmentDate}
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
                          value={formik.values.investmentAmount}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {/* <CInput
                      type="number"
                      name="investmentAmount"
                      value={formik.values.investmentAmount}
                      onChange={formik.handleChange}
                    /> */}
                    {formik.errors.investmentAmount &&
                      formik.touched.investmentAmount && (
                        <CFormText className="help-block textError">
                          {formik.errors.investmentAmount}
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
                          value={formik.values.estimatedReturn}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.estimatedReturn &&
                      formik.touched.estimatedReturn && (
                        <CFormText className="help-block textError">
                          {formik.errors.estimatedReturn}
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
                          value={formik.values.totalRoi}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.totalRoi && formik.touched.totalRoi && (
                      <CFormText className="help-block textError">
                        {formik.errors.totalRoi}
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
                          value={formik.values.anualRoi}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.anualRoi && formik.touched.anualRoi && (
                      <CFormText className="help-block textError">
                        {formik.errors.anualRoi}
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
                      value={formik.values.area}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.area && formik.touched.area && (
                      <CFormText className="help-block textError">
                        {formik.errors.area}
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
                      value={formik.values.street}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.street && formik.touched.street && (
                      <CFormText className="help-block textError">
                        {formik.errors.street}
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
                          value={formik.values.cashReqForLotPurchase}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.cashReqForLotPurchase &&
                      formik.touched.cashReqForLotPurchase && (
                        <CFormText className="help-block textError">
                          {formik.errors.cashReqForLotPurchase}
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
                          value={formik.values.loanForLotPurchase}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.loanForLotPurchase &&
                      formik.touched.loanForLotPurchase && (
                        <CFormText className="help-block textError">
                          {formik.errors.loanForLotPurchase}
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
                          value={formik.values.totalBildingCost}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.totalBildingCost &&
                      formik.touched.totalBildingCost && (
                        <CFormText className="help-block textError">
                          {formik.errors.totalBildingCost}
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
                          value={formik.values.lotPurchaseLoanFinCost}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.lotPurchaseLoanFinCost &&
                      formik.touched.lotPurchaseLoanFinCost && (
                        <CFormText className="help-block textError">
                          {formik.errors.lotPurchaseLoanFinCost}
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
                          value={formik.values.constructionFinCost}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.constructionFinCost &&
                      formik.touched.constructionFinCost && (
                        <CFormText className="help-block textError">
                          {formik.errors.constructionFinCost}
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
                          value={formik.values.softCost}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.softCost && formik.touched.softCost && (
                      <CFormText className="help-block textError">
                        {formik.errors.softCost}
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
                          value={formik.values.additionalRequiredEquity}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.additionalRequiredEquity &&
                      formik.touched.additionalRequiredEquity && (
                        <CFormText className="help-block textError">
                          {formik.errors.additionalRequiredEquity}
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
                          value={formik.values.totalCashReqForProject}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.totalCashReqForProject &&
                      formik.touched.totalCashReqForProject && (
                        <CFormText className="help-block textError">
                          {formik.errors.totalCashReqForProject}
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
                          value={formik.values.avgSalePricePerSqf}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.avgSalePricePerSqf &&
                      formik.touched.avgSalePricePerSqf && (
                        <CFormText className="help-block textError">
                          {formik.errors.avgSalePricePerSqf}
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
                          value={formik.values.totalExpectedIncome}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.totalExpectedIncome &&
                      formik.touched.totalExpectedIncome && (
                        <CFormText className="help-block textError">
                          {formik.errors.totalExpectedIncome}
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
                          value={formik.values.salesCommissionPercent}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.salesCommissionPercent &&
                      formik.touched.salesCommissionPercent && (
                        <CFormText className="help-block textError">
                          {formik.errors.salesCommissionPercent}
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
                          value={formik.values.profitPerProject}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.profitPerProject &&
                      formik.touched.profitPerProject && (
                        <CFormText className="help-block textError">
                          {formik.errors.profitPerProject}
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
                          value={formik.values.profitPerProjectPercent}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.profitPerProjectPercent &&
                      formik.touched.profitPerProjectPercent && (
                        <CFormText className="help-block textError">
                          {formik.errors.profitPerProjectPercent}
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
                          value={formik.values.constructorSharePercent}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.constructorSharePercent &&
                      formik.touched.constructorSharePercent && (
                        <CFormText className="help-block textError">
                          {formik.errors.constructorSharePercent}
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
                          value={formik.values.developerSharePercent}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.developerSharePercent &&
                      formik.touched.developerSharePercent && (
                        <CFormText className="help-block textError">
                          {formik.errors.developerSharePercent}
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
                          value={formik.values.totalCashOnCash}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.totalCashOnCash &&
                      formik.touched.totalCashOnCash && (
                        <CFormText className="help-block textError">
                          {formik.errors.totalCashOnCash}
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
                          value={formik.values.netCashOnCash}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.netCashOnCash &&
                      formik.touched.netCashOnCash && (
                        <CFormText className="help-block textError">
                          {formik.errors.netCashOnCash}
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
                          value={formik.values.projectPeriodMonth}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.projectPeriodMonth &&
                      formik.touched.projectPeriodMonth && (
                        <CFormText className="help-block textError">
                          {formik.errors.projectPeriodMonth}
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
                          value={formik.values.annualReturn}
                          onChange={formik.handleChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>

                    {formik.errors.annualReturn &&
                      formik.touched.annualReturn && (
                        <CFormText className="help-block textError">
                          {formik.errors.annualReturn}
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
                      value={formik.values.userAssigned}
                      onChange={formik.handleChange}
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

                    {formik.errors.userAssigned &&
                      formik.touched.userAssigned && (
                        <CFormText className="help-block textError">
                          {formik.errors.userAssigned}
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
                        onChange={handleChangeRadio}
                        value={true}
                        defaultChecked={formik.values.flagDashboard === true}
                      />
                      <CLabel htmlFor="inline-radio1">Yes</CLabel>

                      <input
                        type="radio"
                        name="flagDashboard"
                        onChange={handleChangeRadio}
                        value={false}
                        defaultChecked={formik.values.flagDashboard === false}
                      />
                      <CLabel htmlFor="inline-radio1">No</CLabel>
                    </div>
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  {formik.values.flagDashboard === true && (
                    <CFormGroup>
                      <CLabel>Index Dashboard</CLabel>
                      <CInput
                        type="Number"
                        name="flagIndex"
                        value={formik.values.flagIndex}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.flagIndex && formik.touched.flagIndex && (
                        <CFormText className="help-block textError">
                          {formik.errors.flagIndex}
                        </CFormText>
                      )}
                    </CFormGroup>
                  )}
                </CCol>

                {/* <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Show on Hollywood</CLabel>
                    <div className="customRadioGroup">
                      <input
                        type="radio"
                        name="isShowHollywood"
                        onChange={handleChangeRadio}
                        value={true}
                        defaultChecked={formik.values.isShowHollywood === true}
                      />
                      <CLabel htmlFor="inline-radio1">Yes</CLabel>

                      <input
                        type="radio"
                        name="isShowHollywood"
                        onChange={handleChangeRadio}
                        value={false}
                        defaultChecked={formik.values.isShowHollywood === false}
                      />
                      <CLabel htmlFor="inline-radio1">No</CLabel>
                    </div>
                  </CFormGroup>
                </CCol>

                <CCol md={6}>
                  <CFormGroup>
                    <CLabel>Show on Silver Lake</CLabel>
                    <div className="customRadioGroup">
                      <input
                        type="radio"
                        name="isSilverLake"
                        onChange={handleChangeRadio}
                        value={true}
                        defaultChecked={formik.values.isSilverLake === true}
                      />
                      <CLabel htmlFor="inline-radio1">Yes</CLabel>

                      <input
                        type="radio"
                        name="isSilverLake"
                        onChange={handleChangeRadio}
                        value={false}
                        defaultChecked={formik.values.isSilverLake === false}
                      />
                      <CLabel htmlFor="inline-radio1">No</CLabel>
                    </div>
                  </CFormGroup>
                </CCol> */}

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
                  <Units />
                </CCol>

                {/* ======== actions form ========= */}
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

      <CModal show={modal} onClose={toggle} centered>
        <CModalHeader closeButton>Create Unit</CModalHeader>
        <CModalBody>
          <AddUnit onClose={toggle} />
        </CModalBody>
      </CModal>
    </div>
  );
};

export default AddProject;
