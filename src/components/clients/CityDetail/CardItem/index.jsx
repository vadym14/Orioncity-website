import React from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const CardItem = ({ title, image, id }) => {
  const history = useHistory();

  const handleView = () => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="cardItem" onClick={handleView}>
      <h3>{title}</h3>

      <div className="viewImage">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

CardItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
};

export default CardItem;
