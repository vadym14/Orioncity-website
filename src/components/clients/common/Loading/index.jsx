import React from "react";
import './index.scss'

import { CSpinner } from "@coreui/react";

const LoadingContainer = (props) => {
  return (
    <div className="loadingContainer">
      <CSpinner color="primary" style={{ width: "4rem", height: "4rem" }} />
    </div>
  );
};

export default LoadingContainer;
