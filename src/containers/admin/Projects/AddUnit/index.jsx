/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./index.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

// actions
import {
  createUnit,
  resetFormUnit,
} from "../../../../stores/reducers/projectSlice";

// ui
import {
  CForm,
  CInput,
  CFormGroup,
  CFormText,
  CLabel,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";

const AddUnit = (props) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    unit: yup.string().required("Please input unit"),
    size: yup.number("Type invalid"),
    cost: yup.number("Type invalid"),
    sale: yup.number("Type invalid"),
    salePrice: yup.number("Type invalid"),
  });

  const formik = useFormik({
    initialValues: {
      unit: "",
      size: 0,
      cost: 0,
      sale: 0,
      salePrice: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(createUnit(values));
      await dispatch(resetFormUnit());
      await formik.resetForm();
      await props.onClose();
    },
  });

  useEffect(() => {
    formik.resetForm();
    return () => {
      formik.resetForm();
    };
  }, []);

  const handleBack = () => {
    props.onClose()
  };

  return (
    <div className="addUnit">
      <CForm method="post" onSubmit={formik.handleSubmit}>
        <CRow>
          <CCol md={12}>
            <CFormGroup>
              <CLabel>Unit</CLabel>
              <CInput
                type="text"
                name="unit"
                value={formik.values.unit}
                onChange={formik.handleChange}
              />
              {formik.errors.unit && formik.touched.unit && (
                <CFormText className="help-block textError">
                  {formik.errors.unit}
                </CFormText>
              )}
            </CFormGroup>
          </CCol>

          <CCol md={6}>
            <CFormGroup>
              <CLabel>Size</CLabel>
              <CInput
                type="number"
                name="size"
                value={formik.values.size}
                onChange={formik.handleChange}
              />
              {formik.errors.size && formik.touched.size && (
                <CFormText className="help-block textError">
                  {formik.errors.size}
                </CFormText>
              )}
            </CFormGroup>
          </CCol>

          <CCol md={6}>
            <CFormGroup>
              <CLabel>Cost</CLabel>
              <CInput
                type="number"
                name="cost"
                value={formik.values.cost}
                onChange={formik.handleChange}
              />
              {formik.errors.cost && formik.touched.cost && (
                <CFormText className="help-block textError">
                  {formik.errors.cost}
                </CFormText>
              )}
            </CFormGroup>
          </CCol>

          <CCol md={6}>
            <CFormGroup>
              <CLabel>Sale</CLabel>
              <CInput
                type="number"
                name="sale"
                value={formik.values.sale}
                onChange={formik.handleChange}
              />
              {formik.errors.sale && formik.touched.sale && (
                <CFormText className="help-block textError">
                  {formik.errors.sale}
                </CFormText>
              )}
            </CFormGroup>
          </CCol>

          <CCol md={6}>
            <CFormGroup>
              <CLabel>Sale Price</CLabel>
              <CInput
                type="number"
                name="salePrice"
                value={formik.values.salePrice}
                onChange={formik.handleChange}
              />
              {formik.errors.salePrice && formik.touched.salePrice && (
                <CFormText className="help-block textError">
                  {formik.errors.salePrice}
                </CFormText>
              )}
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
      </CForm>
    </div>
  );
};

export default AddUnit;
