import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
// actions
import { getProjectsOfCityApi } from "../../../stores/reducers/projectSlice";

// ui
import { CContainer, CRow, CCol } from "@coreui/react";
// components
import CardItem from "./CardItem";

const CityDetailContent = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cityDetailInfo } = useSelector((state) => state.projects);

  console.log(cityDetailInfo);

  useEffect(() => {
    dispatch(getProjectsOfCityApi(id));
  }, [dispatch, id]);

  return (
    <div className="cityDetail">
      <CContainer>
        {cityDetailInfo &&
          cityDetailInfo.city &&
          cityDetailInfo.city.description && (
            <div className="descriptionCity ql-editor">
              {ReactHtmlParser(cityDetailInfo.city.description)}
            </div>
          )}

        <div className="detail">
          <CRow>
            {cityDetailInfo &&
              cityDetailInfo.projects &&
              cityDetailInfo.projects.length > 0 &&
              cityDetailInfo.projects.map((item, i) => (
                <CCol key={i} md={6}>
                  <CardItem
                    id={item._id}
                    title={item.name || ""}
                    image={`${process.env.REACT_APP_CLOUD_FRONT_URI}${
                      (item.picture && item.picture.key) || ""
                    }`}
                  />
                </CCol>
              ))}
          </CRow>
        </div>
      </CContainer>
    </div>
  );
};

export default CityDetailContent;
