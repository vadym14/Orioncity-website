/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// actions
import { getDetailMyProjectApi } from "../../../../stores/reducers/projectSlice";

// ui
import { CRow, CCol, CContainer } from "@coreui/react";

// components
import BasicInfo from "./BasicInfo";
import Units from "./Units";
import LoadingContainer from "../../common/Loading";
import ProfitInfo from './ProfitInfo';

const MyProjectContent = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { myProjectDetail, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    if (!myProjectDetail) {
      dispatch(getDetailMyProjectApi(id));
    }
  }, [dispatch, id]);

  return (
    <div className="myProjectContent">
      {loading ? (
        <LoadingContainer />
      ) : (
        <CContainer>
          <div className="content">
            <CRow>
              <CCol lg={6} md={5}>
                <div className="contentLeft">
                  <h1 className="title">
                    {(myProjectDetail && myProjectDetail.name) || ""}
                  </h1>
                </div>
              </CCol>
              <CCol lg={6} md={7}>
                <Units
                  units={(myProjectDetail && myProjectDetail.units) || []}
                />
              </CCol>
            </CRow>

            <CRow className="mt-40">
              <CCol lg={6} md={12}>
                <BasicInfo data={myProjectDetail} />
              </CCol>
              <CCol lg={6} md={12}>
                <ProfitInfo />
                <ProfitInfo />
                <ProfitInfo />
              </CCol>
            </CRow>
          </div>
        </CContainer>
      )}
    </div>
  );
};

export default MyProjectContent;
