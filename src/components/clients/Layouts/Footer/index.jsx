import React from "react";
import "./index.scss";

import { CContainer, CRow, CCol } from "@coreui/react";

const FooterPage = (props) => {
  return (
    <div className="footerPage">
      <CContainer>
        <div className="content">
          <CRow>
            <CCol sm={6}>
              <p className="textLeft">Contact: +1 (818) 314-8444</p>
            </CCol>
            <CCol sm={6}>
              <p className="textRight">© 2021 by Orion Cityscape LLC</p>
            </CCol>
          </CRow>
        </div>
      </CContainer>
    </div>
  );
};

export default FooterPage;
