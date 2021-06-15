/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "rodal/lib/rodal.css";
import "./index.scss";
import Slider from "react-slick";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Rodal from "rodal";

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

const ProjectDetail = (props) => {
  const sliderRef = useRef(null);
  const contentRef = useRef(null);

  const [isFixed, setIsFixed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [imageViewFull, setImageViewFull] = useState(null);
  const [openGrid, setOpenGrid] = useState(false);

  const handle = useFullScreenHandle();

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      console.log(current, next);
      setCurrentIndex(next + 1);
    },
  };

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

  const handleBackTop = () => {
    window.scrollTo(0, 0);
  };

  const handleViewFullScreen = () => {
    setImageViewFull(images[currentIndex - 1]);
    handle.enter();
  };

  const handleToggleGirds = () => {
    setOpenGrid(!openGrid);
  };

  const handleSelectImage = (index) => {
    setCurrentIndex(index);
    sliderRef.current.slickGoTo(index);
    setOpenGrid(false);
  };

  const handleViewContent = () => {
    contentRef.current.scrollIntoView();
  };

  const handleChangeFullScreen = (state, handle) => {
    if (!state) {
      setImageViewFull(null);
    }
  };

  return (
    <div className="projectDetail">
      <Header />
      <div className="projectDetailContent">
        <div className="banner">
          <Slider ref={sliderRef} className="silderBanner" {...settings}>
            {images &&
              images.map((item, i) => (
                <div className="silderItem" key={i}>
                  <img className="sliderImage" src={item} alt="" />
                </div>
              ))}
          </Slider>

          <div className="toolBar">
            <div className="toolLeft">
              <h3 className="showIndexSlider">
                {currentIndex}/{images.length}
              </h3>
            </div>
            <div className="toolRight">
              <a onClick={handleViewContent}>
                <CIcon name="cil-list" />
              </a>
              <a onClick={handleToggleGirds}>
                <CIcon name="cil-grid" />
              </a>
              <a onClick={handleViewFullScreen}>
                <CIcon name="cil-fullscreen" />
              </a>
            </div>
          </div>
        </div>

        <div className="content" ref={contentRef}>
          <h1>Basarpladsen</h1>

          <p>
            Basarpladsen is a prominent area is in the proximity of Nørrebro
            Station, one of the largest commuter hubs in Copenhagen, Denmark.
          </p>

          <p>
            Located at the intersection between metro, bus, light rail lines, as
            well as bikes and pedestrian paths, Basargrunden is a tight
            infrastructure knot, crossed daily by the many people of the densely
            populated neighborhood of Nørrebro.{" "}
          </p>

          <p>
            For a long time underutilized despite its prime location along the
            buzzing Nørrebrogade street, in the years the area has raised large
            interest and user engagement from the resident of the neighborhood.
          </p>

          <p>
            The transformation project focuses on addressing and optimizing the
            flows on the plaza in relation to the transport hub, as well as
            creating a green and calm space that can be enjoyed by all the
            different families, age, and culture groups of the area, becoming a
            vibrant and inclusive public space which blends in with Nørrebro
            diverse identity.
          </p>

          <p>
            Circular design principles and reuse of materials informed the
            design – most of the elements composing the public space are
            designed to reuse construction waste and building debris already
            available and stocked in depositories and recycling stations in the
            city.
          </p>

          <div className="listDetail">
            <div className="lineItem">
              <h3>Project name</h3>
              <p>Skovhavekvarteret (Forest Garden Village)</p>
            </div>

            <div className="lineItem">
              <h3>Typology</h3>
              <p>Masterplan, Residential</p>
            </div>

            <div className="lineItem">
              <h3>Location</h3>
              <p>Middelfart, Denmark</p>
            </div>

            <div className="lineItem">
              <h3>Year</h3>
              <p>2020-</p>
            </div>

            <div className="lineItem">
              <h3>Status</h3>
              <p>In progress</p>
            </div>

            <div className="lineItem">
              <h3>Size</h3>
              <p>100.0000 m2</p>
            </div>

            <div className="lineItem">
              <h3>Client</h3>
              <p>Middelfart Municipality</p>
            </div>

            <div className="lineItem">
              <h3>Collaborators</h3>
              <p>N/A</p>
            </div>

            <div className="lineItem">
              <h3>Design team</h3>
              <p>
                Sinus, Lynge, Daniel Veenboer, Yulia Kozlova, Evgeny Markachev,
                Gorka Medina Calzada, Marco Antonio Ravini, Joel Brynielsson,
                Filippa Gurt
              </p>
            </div>
          </div>
        </div>
      </div>

      {isFixed && (
        <div className="backTop" onClick={handleBackTop}>
          <CIcon name="cilArrowTop" />
        </div>
      )}

      <Rodal
        visible={openGrid}
        onClose={handleToggleGirds}
        width="100%"
        height="100vh"
      >
        <div className="viewGalleryImages">
          <CRow>
            {images &&
              images.length > 0 &&
              images.map((item, i) => (
                <CCol key={i} xs={12} sm={6} md={4}>
                  <div
                    className="galleryItem"
                    onClick={() => handleSelectImage(i)}
                  >
                    <img src={item} alt="" />
                  </div>
                </CCol>
              ))}
          </CRow>
        </div>
      </Rodal>

      {/* {imageViewFull && ( */}
      <FullScreen handle={handle} onChange={handleChangeFullScreen}>
        {imageViewFull && (
          <img
            alt=""
            src={imageViewFull}
            style={{ width: "100%", height: "100vh" }}
          />
        )}
      </FullScreen>
      {/* )} */}

      <Footer />
    </div>
  );
};

export default ProjectDetail;
