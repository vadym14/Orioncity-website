import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./index.scss";
import Slider from "react-slick";

// components
import Header from "../Layouts/NewHeader";

// images
import Slider1 from "../../../assets/images/slider1.jpg";
import Slider2 from "../../../assets/images/slider2.jpg";
import Slider3 from "../../../assets/images/slider3.jpeg";
import Slider4 from "../../../assets/images/slider4.jpg";
import Slider5 from "../../../assets/images/slider5.jpg";
import Slider6 from "../../../assets/images/slider6.jpg";
import Slider7 from "../../../assets/images/slider7.jpg";
import Slider8 from "../../../assets/images/slider8.jpg";

const slides = [
  Slider1,
  Slider2,
  Slider3,
  Slider4,
  Slider5,
  Slider6,
  Slider7,
  Slider8,
];

const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const NewHomeContent = (props) => {
  return (
    <div className="newHomeContent">
      <Header />
      <Slider className="silderHome" {...settings}>
        {slides &&
          slides.map((item, i) => (
            <div className="silderItem" key={i}>
              <img className="sliderImage" src={item} alt="" />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default NewHomeContent;
