/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";

import { CIcon } from "@coreui/icons-react";
// ui
import { CRow, CCol } from "@coreui/react";

// components
import Header from "../Layouts/NewHeader";
import Footer from "../Layouts/NewFooter";

// images
import Bg1 from "../../../assets/images/bg1.jpeg";
import Bg2 from "../../../assets/images/bg2.jpeg";
import Bg3 from "../../../assets/images/bg3.jpeg";
import Bg4 from "../../../assets/images/bg7.jpeg";
import Bg5 from "../../../assets/images/bg5.jpeg";
import Bg6 from "../../../assets/images/bg6.jpeg";

const images = [Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, Bg3, Bg1, Bg4, Bg3];

const ProjectsContent = (props) => {
  const history = useHistory();

  const [isFixed, setIsFixed] = useState(false);
  const [indexHover, setIndexHover] = useState(null);
  const [filterIndex, setFilterIndex] = useState(0);

  const handleScroll = (event) => {
    if (window.pageYOffset > 5) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleLeave = (index) => {
    setIndexHover(null);
  };

  const handleHover = (index) => {
    setIndexHover(index);
  };

  const handleBackTop = () => {
    window.scrollTo(0, 0);
  };

  const viewDetailProject = () => {
    history.push("/projects/detail");
  };

  const renderItems = () => {
    let results = [];
    let total = 40;

    switch (filterIndex) {
      case 0:
        total = 40;
        break;
      case 1:
        total = 31;
        break;
      case 2:
        total = 24;
        break;
      case 3:
        total = 9;
        break;
      case 4:
        total = 15;
        break;

      default:
        total = 40;
    }

    for (let i = 0; i < total; i++) {
      const indexStr = String(i).slice(-1);

      results.push(
        <CCol key={`${i}1`} lg={4} md={6} xs={12}>
          <div
            className={`projectItem ${indexHover === i ? "isHover" : ""}`}
            onMouseLeave={() => handleLeave(i)}
            onMouseEnter={() => handleHover(i)}
            onClick={viewDetailProject}
          >
            <div className="viewImage">
              <img src={images[Number(indexStr)]} alt="" />
            </div>
            <h3>Title Project</h3>
          </div>
        </CCol>
      );
    }

    return results;
  };

  const onSelectFilter = (index) => {
    setFilterIndex(index);
  };

  return (
    <div className="projectsPage">
      <Header isFixed={isFixed} />

      <div className="projectsContent">
        <div className="filters">
          <label htmlFor="">Filters: </label>
          <ul>
            <li>
              <a
                className={`${filterIndex === 0 ? "active" : ""}`}
                onClick={() => onSelectFilter(0)}
              >
                All
              </a>
            </li>
            <li>
              <a
                className={`${filterIndex === 1 ? "active" : ""}`}
                onClick={() => onSelectFilter(1)}
              >
                City 1
              </a>
            </li>
            <li>
              <a
                className={`${filterIndex === 2 ? "active" : ""}`}
                onClick={() => onSelectFilter(2)}
              >
                City 2
              </a>
            </li>
            <li>
              <a
                className={`${filterIndex === 3 ? "active" : ""}`}
                onClick={() => onSelectFilter(3)}
              >
                City 3
              </a>
            </li>
          </ul>
        </div>

        <CRow>{renderItems()}</CRow>
      </div>

      {isFixed && (
        <div className="backTop" onClick={handleBackTop}>
          <CIcon name="cilArrowTop" />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectsContent;
