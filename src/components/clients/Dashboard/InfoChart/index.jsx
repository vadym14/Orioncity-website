import React, { useRef, useEffect, useState } from "react";
import "./index.scss";
import PropTypes from "prop-types";

import PieApexcharts from "../../common/Chartjs/Apexcharts";

const useResize = (myRef) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(myRef.current.offsetWidth);
      setHeight(myRef.current.offsetHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  return { width, height };
};

const InfoChart = ({ title, total, options, series }) => {
  const refChart = useRef(null);

  const [widthBox, setWidthBox] = useState(0);

  useEffect(() => {
    if (refChart.current) {
      const _width = refChart.current.offsetWidth;
      setWidthBox(_width);
    }
  }, [refChart]);

  const { width } = useResize(refChart);

  return (
    <div className="infoChart">
      <h2>{title}</h2>

      <div className="viewChart" ref={refChart}>
        {widthBox && (
          <PieApexcharts
            title={title}
            width={width === 0 ? widthBox : width}
            options={options}
            series={series}
          />
        )}
      </div>

      <h4>Total: {total}</h4>
    </div>
  );
};

InfoChart.propTypes = {
  title: PropTypes.string,
  total: PropTypes.string,
};

export default InfoChart;
