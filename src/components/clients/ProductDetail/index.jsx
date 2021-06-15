/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// actions
import {
  getDetailProjectHomeApi,
  resetData,
} from "../../../stores/reducers/projectSlice";

// ui
import { CContainer, CModal, CModalBody } from "@coreui/react";
// components
import LoadingContainer from "../common/Loading";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, homeProjectDetail, error } = useSelector(
    (state) => state.projects
  );
  const [modal, setModal] = useState(false);
  const [imagePopup, setImagePopup] = useState(null);

  useEffect(() => {
    if (!homeProjectDetail) {
      dispatch(getDetailProjectHomeApi(id));
    }
    return () => {
      dispatch(resetData());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    return () => {
      dispatch(resetData());
    };
  }, [dispatch, error]);

  const toggle = (img) => {
    setImagePopup(img);
    setModal(!modal);
  };

  return (
    <div className="productDetail">
      {loading ? (
        <LoadingContainer />
      ) : (
        <CContainer>
          <div className="content">
            <h2>{(homeProjectDetail && homeProjectDetail.name) || ""}</h2>

            <div
              className="viewImage"
              onClick={() =>
                toggle(
                  `${process.env.REACT_APP_CLOUD_FRONT_URI}${
                    (homeProjectDetail &&
                      homeProjectDetail.picture &&
                      homeProjectDetail.picture.key) ||
                    ""
                  }`
                )
              }
            >
              <img
                src={`${process.env.REACT_APP_CLOUD_FRONT_URI}${
                  (homeProjectDetail &&
                    homeProjectDetail.picture &&
                    homeProjectDetail.picture.key) ||
                  ""
                }`}
                alt=""
              />
            </div>

            {homeProjectDetail &&
              homeProjectDetail.gallery &&
              homeProjectDetail.gallery.length > 0 &&
              homeProjectDetail.gallery.map((item, i) => (
                <div
                  key={i}
                  className="viewImage"
                  onClick={() =>
                    toggle(
                      `${process.env.REACT_APP_CLOUD_FRONT_URI}${
                        (item && item.key) || ""
                      }`
                    )
                  }
                >
                  <img
                    src={`${process.env.REACT_APP_CLOUD_FRONT_URI}${
                      (item && item.key) || ""
                    }`}
                    alt=""
                  />
                </div>
              ))}
          </div>

          <CModal
            centered={true}
            className="modalCustom"
            show={modal}
            onClose={toggle}
          >
            <CModalBody>
              <div className="contentCustom">
                <img src={imagePopup} alt="" />
              </div>
            </CModalBody>
          </CModal>
        </CContainer>
      )}
    </div>
  );
};

export default ProductDetail;
