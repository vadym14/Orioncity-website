import React from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// actions
import { getDetailMyProjectApi } from "../../../../stores/reducers/projectSlice";

// ui
import { CRow, CCol } from "@coreui/react";
import moment from "moment";

const CardItem = ({
  id,
  image,
  title,
  investmentDate,
  investmentAmount,
  estimatedReturn,
  totalRoi,
  anualRoi,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleViewDetail = async () => {
    await dispatch(getDetailMyProjectApi(id));
    await history.push(`/dashboard/my-projects/${id}`);
  };

  return (
    <div className="cardItem">
      <CRow>
        <CCol md={6}>
          <img
            src={image}
            alt=""
            style={{ width: "100%" }}
            onClick={handleViewDetail}
          />
        </CCol>
        <CCol md={6}>
          <div className="title">
            <h3 onClick={handleViewDetail}>{title}</h3>
          </div>
        </CCol>
      </CRow>

      <div className="description">
        <p className="textLeft">Investment date:</p>
        <p className="textRight">
          {moment(investmentDate).format("MMM DD YYYY")}
        </p>
      </div>

      <div className="description">
        <p className="textLeft">Investment Amount:</p>
        <p className="textRight">$ {investmentAmount}</p>
      </div>

      <div className="description">
        <p className="textLeft">Estimated Return:</p>
        <p className="textRight">$ {estimatedReturn}</p>
      </div>

      <div className="description">
        <p className="textLeft">Estimated Total ROI:</p>
        <p className="textRight">{totalRoi}%</p>
      </div>

      <div className="description">
        <p className="textLeft">Estimated Anual ROI:</p>
        <p className="textRight">{anualRoi}%</p>
      </div>
    </div>
  );
};

CardItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  anualRoi: PropTypes.number,
  totalRoi: PropTypes.number,
  investmentAmount: PropTypes.number,
};

export default CardItem;
