/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ItemHouse = ({ image, project }) => {
  // const history = useHistory();

  // const handleViewDetail = () => {
  //   history.push("/products/slug-detail");
  // };

  return (
    <div className="itemHouse">
      <Link to={`/products/${project._id}`} />
      {project && project.picture && (
        <img
          src={`${process.env.REACT_APP_CLOUD_FRONT_URI}${
            project.picture && project.picture.key
          }`}
          alt=""
        />
      )}
    </div>
  );
};

ItemHouse.propTypes = {
  project: PropTypes.object,
  image: PropTypes.string,
};

export default ItemHouse;
