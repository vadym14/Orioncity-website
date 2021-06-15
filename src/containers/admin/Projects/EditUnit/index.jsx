import React from "react";
import "./index.scss";
import * as yup from "yup";
import { useFormik, Formik } from "formik";
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

const EditUnit = ({ onClose, onSave, data }) => {
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
      unit: (data && data.unit) || "",
      size: (data && data.size) || 0,
      cost: (data && data.cost) || 0,
      sale: (data && data.sale) || 0,
      salePrice: (data && data.salePrice) || 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(createUnit(values));
      await dispatch(resetFormUnit());
      await formik.resetForm();
      await onClose();
    },
  });

  const handleBack = () => {};

  return (
    <div className="addUnit">
      {data && (
        <Formik
          initialValues={{
            unit: data.unit || "",
            size: data.size || 0,
            cost: data.cost || 0,
            sale: data.sale || 0,
            salePrice: data.salePrice || 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            onSave(values)
          }}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <CForm method="post" onSubmit={handleSubmit}>
              <CRow>
                <CCol md={12}>
                  <CFormGroup>
                    <CLabel>Unit</CLabel>
                    <CInput
                      type="text"
                      name="unit"
                      value={values.unit}
                      onChange={handleChange}
                    />
                    {errors.unit && touched.unit && (
                      <CFormText className="help-block textError">
                        {errors.unit}
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
                      value={values.size}
                      onChange={handleChange}
                    />
                    {errors.size && touched.size && (
                      <CFormText className="help-block textError">
                        {errors.size}
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
                      value={values.cost}
                      onChange={handleChange}
                    />
                    {errors.cost && touched.cost && (
                      <CFormText className="help-block textError">
                        {errors.cost}
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
                      value={values.sale}
                      onChange={handleChange}
                    />
                    {errors.sale && touched.sale && (
                      <CFormText className="help-block textError">
                        {errors.sale}
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
                      value={values.salePrice}
                      onChange={handleChange}
                    />
                    {errors.salePrice && touched.salePrice && (
                      <CFormText className="help-block textError">
                        {errors.salePrice}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>

                <CCol md={12}>
                  <div className="actions">
                    <CButton color="danger" onClick={handleBack}>
                      Back
                    </CButton>

                    <CButton onClick={handleSubmit} color="success">
                      Save
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CForm>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditUnit;
